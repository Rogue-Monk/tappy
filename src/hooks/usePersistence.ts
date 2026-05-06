import { Editor } from '@tiptap/react';
import { useCallback } from 'react';

export interface UsePersistenceOptions {
  editor: Editor | null;
  key?: string; // Optional key for local storage
}

export function usePersistence({ editor, key = 'tappy-editor-content' }: UsePersistenceOptions) {
  
  const saveContent = useCallback(() => {
    if (!editor) return null;
    const json = editor.getJSON();
    if (key) {
      try {
        localStorage.setItem(key, JSON.stringify(json));
      } catch (e) {
        console.warn('Failed to save to localStorage', e);
      }
    }
    return json;
  }, [editor, key]);

  const loadContent = useCallback((data?: any) => {
    if (!editor) return false;
    
    let contentToLoad = data;
    
    if (!contentToLoad && key) {
      try {
        const saved = localStorage.getItem(key);
        if (saved) {
          contentToLoad = JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Failed to load from localStorage', e);
      }
    }

    if (contentToLoad) {
      editor.commands.setContent(contentToLoad, { emitUpdate: false });
      return true;
    }
    
    return false;
  }, [editor, key]);

  const exportHTML = useCallback(() => {
    if (!editor) return '';
    return editor.getHTML();
  }, [editor]);

  return {
    saveContent,
    loadContent,
    exportHTML
  };
}
