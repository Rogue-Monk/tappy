import { Node, mergeAttributes, nodePasteRule } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { EmbedWrapper } from '../components/EmbedWrapper';
import { embedService } from '../../../services/EmbedResolver';

export interface SmartEmbedOptions {
  addPasteHandler: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    smartEmbed: {
      /**
       * Set a smart embed node
       */
      setSmartEmbed: (options: { src?: string; platform: string; embedType: 'iframe' | 'card'; originalUrl: string; metadata?: any }) => ReturnType;
    };
  }
}

export const SmartEmbed = Node.create<SmartEmbedOptions>({
  name: 'smartEmbed',

  addOptions() {
    return {
      addPasteHandler: true,
    };
  },

  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      platform: { default: 'generic' },
      embedType: { default: 'iframe' },
      originalUrl: { default: null },
      metadata: { default: null },
      isLoading: { default: false }, // Useful for showing loading state while fetching async
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-smart-embed]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-smart-embed': '' }, ['iframe', mergeAttributes(HTMLAttributes, { allowfullscreen: 'true' })]];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedWrapper);
  },

  addCommands() {
    return {
      setSmartEmbed:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addProseMirrorPlugins() {
    if (!this.options.addPasteHandler) return [];

    return [
      new Plugin({
        key: new PluginKey('smartEmbedPaste'),
        props: {
          handlePaste: (view: any, event: any, slice: any) => {
            if (!event.clipboardData) return false;
            
            const text = event.clipboardData.getData('text/plain');
            
            // Check if it's a valid URL
            try {
              new URL(text);
            } catch {
              return false; // Not a URL, let default TipTap pasting handle it
            }

            // It's a valid URL, we'll intercept and show a loading state
            // Let's resolve it async
            const { state, dispatch } = view;
            const { tr } = state;
            
            const pos = state.selection.from;
            
            // Insert a placeholder node with isLoading=true
            const node = this.type.create({
              originalUrl: text,
              isLoading: true,
            });
            
            dispatch(tr.replaceSelectionWith(node));
            
            // Async resolution
            embedService.resolveUrl(text).then((result) => {
              // Find the node we just inserted and update its attributes
              view.state.doc.descendants((node: any, pos: any) => {
                if (node.type.name === this.name && node.attrs.originalUrl === text && node.attrs.isLoading) {
                  const updateTr = view.state.tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    src: result.src,
                    platform: result.platform,
                    embedType: result.type,
                    metadata: result.metadata,
                    isLoading: false,
                  });
                  view.dispatch(updateTr);
                  return false; // Stop traversing
                }
              });
            });

            return true; // Handled
          },
        },
      }),
    ];
  },
});
