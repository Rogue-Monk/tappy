import { Node, mergeAttributes, nodePasteRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { EmbedWrapper } from '../components/EmbedWrapper';

export interface VideoEmbedOptions {
  addPasteHandler: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    videoEmbed: {
      /**
       * Set a video embed node
       */
      setVideoEmbed: (options: { src: string; platform: string }) => ReturnType;
    };
  }
}

export const VideoEmbed = Node.create<VideoEmbedOptions>({
  name: 'videoEmbed',

  addOptions() {
    return {
      addPasteHandler: true,
    };
  },

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      platform: {
        default: 'generic',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-video-embed]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-video-embed': '' }, ['iframe', mergeAttributes(HTMLAttributes, { allowfullscreen: 'true' })]];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmbedWrapper);
  },

  addCommands() {
    return {
      setVideoEmbed:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return [];
    }

    const rules = [
      // YouTube
      nodePasteRule({
        find: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            src: `https://www.youtube.com/embed/${match[1]}`,
            platform: 'youtube',
          };
        },
      }),
      // Vimeo
      nodePasteRule({
        find: /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:$|\/|\?)/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            src: `https://player.vimeo.com/video/${match[1]}`,
            platform: 'vimeo',
          };
        },
      }),
      // Instagram
      nodePasteRule({
        find: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            src: `https://www.instagram.com/p/${match[1]}/embed`,
            platform: 'instagram',
          };
        },
      }),
      // Twitter/X
      nodePasteRule({
        find: /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)\/status\/([0-9]+)/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            src: `https://twitframe.com/show?url=https://twitter.com/${match[1]}/status/${match[2]}`,
            platform: 'twitter',
          };
        },
      }),
      // Reddit
      nodePasteRule({
        find: /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/([a-zA-Z0-9_]+)\/comments\/([a-zA-Z0-9_]+)\/([a-zA-Z0-9_]+)/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            src: `https://www.redditmedia.com/r/${match[1]}/comments/${match[2]}/${match[3]}/?embed=true`,
            platform: 'reddit',
          };
        },
      }),
      // Facebook
      nodePasteRule({
        find: /((?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:video\.php\?v=\d+|.*?\/videos\/\d+|watch\/?\?v=\d+))/g,
        type: this.type,
        getAttributes: (match) => {
          return {
            src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(match[1])}`,
            platform: 'facebook',
          };
        },
      }),
    ];

    return rules;
  },
});
