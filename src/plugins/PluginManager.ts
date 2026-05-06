import { TappyPlugin } from './types';

class PluginManager {
  private plugins: Map<string, TappyPlugin> = new Map();

  /**
   * Register a new plugin
   * @param plugin The plugin to register
   */
  registerPlugin(plugin: TappyPlugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`[Tappy Plugin Manager] Plugin with name "${plugin.name}" is already registered. Overwriting.`);
    }
    this.plugins.set(plugin.name, plugin);
    
    // Call the onLoad hook if defined
    if (plugin.onLoad) {
      plugin.onLoad();
    }
  }

  /**
   * Unregister an existing plugin
   * @param name The name of the plugin to remove
   */
  unregisterPlugin(name: string): void {
    if (this.plugins.has(name)) {
      this.plugins.delete(name);
    }
  }

  /**
   * Get all registered plugins
   * @returns Array of TappyPlugin
   */
  getPlugins(): TappyPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Get all TipTap extensions from registered plugins
   * @returns Array of TipTap Extensions
   */
  getTipTapExtensions(): any[] {
    return this.getPlugins()
      .filter((plugin) => plugin.tiptapExtension !== undefined)
      .map((plugin) => plugin.tiptapExtension);
  }
}

// Export a singleton instance
export const pluginManager = new PluginManager();
