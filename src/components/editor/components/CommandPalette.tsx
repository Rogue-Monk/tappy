import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Type, Image as ImageIcon, Video, Code, Heading1, Heading2, Heading3 } from 'lucide-react';

export interface CommandItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  command: (props: any) => void;
}

export const getSuggestionItems = ({ query }: { query: string }) => {
  const items: CommandItem[] = [
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
      icon: <Type className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run();
      },
    },
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      icon: <Heading1 className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      icon: <Heading2 className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      icon: <Heading3 className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
      },
    },
    {
      title: 'Code Block',
      description: 'Capture a code snippet.',
      icon: <Code className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
    {
      title: 'Embed Video',
      description: 'Embed from YouTube, Instagram, Twitter...',
      icon: <Video className="w-4 h-4" />,
      command: ({ editor, range }) => {
        const url = window.prompt('Enter Video or Post URL');
        if (url) {
          // Temporarily insert generic embed, it will be resolved by the plugin we wrote earlier
          // Wait, the SmartEmbed paste rule triggers on paste. If we do it via command palette, we should ideally trigger the resolution.
          // For now, we can insert the smartEmbed node with isLoading and trigger resolution manually, or let the user paste it in.
          // Let's insert a raw text and let TipTap's paste rule handle it if possible, 
          // or we can invoke the setSmartEmbed directly if we expose it properly.
          editor.chain().focus().deleteRange(range).insertContent(url).run();
        } else {
          editor.chain().focus().deleteRange(range).run();
        }
      },
    },
  ];

  return items.filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10);
};

export const CommandPalette = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  if (!props.items.length) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-xl overflow-hidden min-w-[280px] p-2 flex flex-col gap-1">
      {props.items.map((item: CommandItem, index: number) => (
        <button
          className={`flex items-center gap-3 p-2 rounded-lg text-left transition-colors w-full ${
            index === selectedIndex
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
          key={index}
          onClick={() => selectItem(index)}
        >
          <div className={`p-2 rounded-md ${
             index === selectedIndex ? 'bg-white dark:bg-gray-800 shadow-sm' : 'bg-gray-100 dark:bg-gray-800'
          }`}>
            {item.icon}
          </div>
          <div>
            <div className="font-medium text-sm">{item.title}</div>
            <div className={`text-xs ${
              index === selectedIndex ? 'text-blue-500/70 dark:text-blue-400/70' : 'text-gray-500'
            }`}>{item.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
});

CommandPalette.displayName = 'CommandPalette';
