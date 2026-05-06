import { useEffect, useState } from 'react';
import { pluginManager } from '../plugins/PluginManager';
import { TappyPlugin } from '../plugins/types';
import { Extension, Node, Mark } from '@tiptap/core';

export function useTappyPlugins() {
  const [plugins, setPlugins] = useState<TappyPlugin[]>([]);
  const [extensions, setExtensions] = useState<(Extension | Node | Mark)[]>([]);

  useEffect(() => {
    // Initial load
    setPlugins(pluginManager.getPlugins());
    setExtensions(pluginManager.getTipTapExtensions());

    // In a real advanced scenario, we might want an event emitter on PluginManager
    // to dynamically update state if plugins are registered *after* initialization.
    // For now, this hook captures the state of plugins at the time it's called.
  }, []);

  return {
    plugins,
    extensions,
  };
}
