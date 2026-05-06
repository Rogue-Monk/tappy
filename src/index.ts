export { TappyEditor } from "./components/editor/TappyEditor";
export type { TappyEditorProps, TappyEditorRef } from "./components/editor/TappyEditor";
export { defaultExtensions } from "./components/editor/Extensions";

// Plugin System
export { pluginManager } from "./plugins/PluginManager";
export type { TappyPlugin, PluginType, ParsedResult } from "./plugins/types";
export { useTappyPlugins } from "./hooks/useTappyPlugins";

// Services
export { embedService } from "./services/EmbedResolver";
export type { EmbedResolver, EmbedResult } from "./services/EmbedResolver";

// Hooks
export { usePersistence } from "./hooks/usePersistence";
export { useCollaboration } from "./hooks/useCollaboration";
