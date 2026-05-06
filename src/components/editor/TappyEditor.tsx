"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { defaultExtensions } from "./Extensions";
import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { useTappyPlugins } from "../../hooks/useTappyPlugins";

export interface TappyEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  readOnly?: boolean;
}

export interface TappyEditorRef {
  getEditor: () => Editor | null;
}

export const TappyEditor = forwardRef<TappyEditorRef, TappyEditorProps>(
  ({ value = "", onChange, className, readOnly = false }, ref) => {
    const { extensions: pluginExtensions } = useTappyPlugins();
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const editor = useEditor({
      extensions: [...defaultExtensions, ...pluginExtensions],
      content: value,
      editable: !readOnly,
      immediatelyRender: false,
      onUpdate: ({ editor }) => {
        // Debounce onChange to optimize performance
        if (onChangeRef.current) {
          onChangeRef.current(editor.getHTML());
        }
        setCharacterCount(editor.storage.characterCount?.characters() || 0);
      },
      editorProps: {
        attributes: {
          class: cn("focus:outline-none min-h-[150px] cursor-text pb-8"),
        },
      },
    });

    const [characterCount, setCharacterCount] = useState(0);

    useImperativeHandle(ref, () => ({
      getEditor: () => editor,
    }));

    useEffect(() => {
      if (editor) {
        setCharacterCount(editor.storage.characterCount?.characters() || 0);
      }
    }, [editor, value]);

    // Sync external value changes if they differ from current content
    useEffect(() => {
      if (editor && value && value !== editor.getHTML()) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }, [value, editor]);

    const characterLimit = 300;
    const percentage = Math.min(
      100,
      Math.round((characterCount / characterLimit) * 100),
    );
    const radius = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    let indicatorColor = "text-green-500";
    if (characterCount >= 101 && characterCount <= 200) {
      indicatorColor = "text-gray-500 dark:text-gray-400";
    } else if (characterCount >= 201 && characterCount <= 260) {
      indicatorColor = "text-yellow-500";
    } else if (characterCount >= 261) {
      indicatorColor = "text-red-500";
    }

    return (
      <div
        className={cn(
          "w-full bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300",
          "focus-within:ring-2 focus-within:ring-white/40 dark:focus-within:ring-white/40 focus-within:border-white/40 dark:focus-within:border-white/40 focus-within:shadow-md",
          className,
        )}
      >
        <div
          className="flex-grow p-4 sm:p-6 text-base leading-relaxed text-gray-900 dark:text-gray-100 relative"
          onClick={() => {
            if (!editor?.isFocused) {
              editor?.commands.focus("end");
            }
          }}
        >
          <EditorContent editor={editor} className="h-full" />

          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium bg-white/30 dark:bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 dark:border-white/10 shadow-sm">
            <span>
              {characterCount} / {characterLimit}
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="-rotate-90"
            >
              <circle
                className="text-gray-200 dark:text-gray-800"
                strokeWidth="3"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="12"
                cy="12"
              />
              <circle
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  indicatorColor,
                )}
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="12"
                cy="12"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  },
);

TappyEditor.displayName = "TappyEditor";
export default TappyEditor;
