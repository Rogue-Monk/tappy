import * as react from 'react';
import { ReactNode } from 'react';
import { Editor } from '@tiptap/react';
import * as _tiptap_extension_image from '@tiptap/extension-image';
import * as _tiptap_extension_link from '@tiptap/extension-link';
import * as _tiptap_extensions from '@tiptap/extensions';
import * as _tiptap_starter_kit from '@tiptap/starter-kit';
import * as _tiptap_core from '@tiptap/core';
import { Extension, Node, Mark } from '@tiptap/core';

interface TappyEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    readOnly?: boolean;
}
interface TappyEditorRef {
    getEditor: () => Editor | null;
}
declare const TappyEditor: react.ForwardRefExoticComponent<TappyEditorProps & react.RefAttributes<TappyEditorRef>>;

interface SmartEmbedOptions {
    addPasteHandler: boolean;
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartEmbed: {
            /**
             * Set a smart embed node
             */
            setSmartEmbed: (options: {
                src?: string;
                platform: string;
                embedType: 'iframe' | 'card';
                originalUrl: string;
                metadata?: any;
            }) => ReturnType;
        };
    }
}

declare const defaultExtensions: (_tiptap_core.Node<SmartEmbedOptions, any> | _tiptap_core.Extension<any, any> | _tiptap_core.Extension<_tiptap_starter_kit.StarterKitOptions, any> | _tiptap_core.Extension<_tiptap_extensions.PlaceholderOptions, any> | _tiptap_core.Mark<_tiptap_extension_link.LinkOptions, any> | _tiptap_core.Node<_tiptap_extension_image.ImageOptions, any> | _tiptap_core.Extension<_tiptap_extensions.CharacterCountOptions, _tiptap_extensions.CharacterCountStorage>)[];

type PluginType = 'node' | 'mark' | 'extension' | 'utility';
interface ParsedResult {
    matched: boolean;
    content?: any;
}
interface TappyPlugin {
    /**
     * Unique name of the plugin
     */
    name: string;
    /**
     * The type of plugin
     */
    type: PluginType;
    /**
     * Optional custom parsing logic for inputs (e.g., matching a specific URL or markdown syntax)
     */
    parse?: (input: string) => boolean | ParsedResult;
    /**
     * Optional transform logic to modify input content
     */
    transform?: (input: string) => any;
    /**
     * The underlying TipTap extension/node/mark to inject
     */
    tiptapExtension?: Extension | Node | Mark;
    /**
     * Optional React component to render (e.g., for toolbar items or floating menus)
     */
    render?: (props: any) => ReactNode;
    /**
     * Lifecycle hook called when the plugin is loaded into the editor
     */
    onLoad?: () => void;
}

declare class PluginManager {
    private plugins;
    /**
     * Register a new plugin
     * @param plugin The plugin to register
     */
    registerPlugin(plugin: TappyPlugin): void;
    /**
     * Unregister an existing plugin
     * @param name The name of the plugin to remove
     */
    unregisterPlugin(name: string): void;
    /**
     * Get all registered plugins
     * @returns Array of TappyPlugin
     */
    getPlugins(): TappyPlugin[];
    /**
     * Get all TipTap extensions from registered plugins
     * @returns Array of TipTap Extensions
     */
    getTipTapExtensions(): any[];
}
declare const pluginManager: PluginManager;

declare function useTappyPlugins(): {
    plugins: TappyPlugin[];
    extensions: (Extension<any, any> | Node<any, any> | Mark<any, any>)[];
};

interface EmbedResult {
    src?: string;
    html?: string;
    platform: string;
    type: 'iframe' | 'card' | 'error';
    metadata?: {
        title?: string;
        description?: string;
        image?: string;
        site_name?: string;
    };
}
interface EmbedResolver {
    id: string;
    match: (url: URL) => boolean;
    resolve: (url: URL) => Promise<EmbedResult>;
}
declare class EmbedService {
    private resolvers;
    registerResolver(resolver: EmbedResolver): void;
    resolveUrl(urlString: string): Promise<EmbedResult>;
}
declare const embedService: EmbedService;

interface UsePersistenceOptions {
    editor: Editor | null;
    key?: string;
}
declare function usePersistence({ editor, key }: UsePersistenceOptions): {
    saveContent: () => _tiptap_core.DocumentType<Record<string, any> | undefined, _tiptap_core.NodeType<string, Record<string, any> | undefined, any, (_tiptap_core.NodeType<any, any, any, any> | _tiptap_core.TextType<_tiptap_core.MarkType<any, any>>)[]>[]> | null;
    loadContent: (data?: any) => boolean;
    exportHTML: () => string;
};

interface CollaborationOptions {
    docId: string;
    provider: any;
    user?: {
        name: string;
        color: string;
    };
}
declare function useCollaboration({ docId, provider, user }: CollaborationOptions): {
    extensions: any[];
};

export { type EmbedResolver, type EmbedResult, type ParsedResult, type PluginType, TappyEditor, type TappyEditorProps, type TappyEditorRef, type TappyPlugin, defaultExtensions, embedService, pluginManager, useCollaboration, usePersistence, useTappyPlugins };
