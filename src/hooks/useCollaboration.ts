import { useMemo } from 'react';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';

export interface CollaborationOptions {
  docId: string;
  provider: any; // Can be a WebSocket provider, WebRTC provider, etc.
  user?: {
    name: string;
    color: string;
  };
}

export function useCollaboration({ docId, provider, user }: CollaborationOptions) {
  
  const extensions = useMemo(() => {
    if (!provider) return [];

    const exts: any[] = [
      Collaboration.configure({
        document: provider.doc,
      }),
    ];

    if (user) {
      exts.push(
        CollaborationCursor.configure({
          provider: provider,
          user: user,
        })
      );
    }

    return exts;
  }, [provider, user, docId]);

  return {
    extensions,
  };
}
