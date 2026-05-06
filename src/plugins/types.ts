import { Extension, Node, Mark } from '@tiptap/core';
import { ReactNode } from 'react';

export type PluginType = 'node' | 'mark' | 'extension' | 'utility';

export interface ParsedResult {
  matched: boolean;
  content?: any;
}

export interface TappyPlugin {
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
