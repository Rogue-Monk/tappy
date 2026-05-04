"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./Toolbar";
import BubbleMenu from "./BubbleMenu";
import { defaultExtensions } from "./Extensions";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TappyEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  readOnly?: boolean;
}

export const TappyEditor = ({
  value = "",
  onChange,
  className,
  readOnly = false,
}: TappyEditorProps) => {
  const editor = useEditor({
    extensions: defaultExtensions,
    content: value,
    editable: !readOnly,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn("focus:outline-none min-h-[150px] cursor-text"),
      },
    },
  });

  const [popupMenu, setPopupMenu] = useState<{ x: number; y: number } | null>(
    null,
  );
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setPopupMenu(null);
      }
    };
    if (popupMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupMenu]);

  // Sync external value changes if they differ from current content
  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-[#0a0a0a] backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all duration-300",
        "focus-within:ring-2 focus-within:ring-white/40 dark:focus-within:ring-white/40 focus-within:border-white/40 dark:focus-within:border-white/40 focus-within:shadow-md",
        className,
      )}
    >
      {!readOnly && <Toolbar editor={editor} />}
      {!readOnly && <BubbleMenu editor={editor} />}
      <div
        className="flex-grow p-4 sm:p-6 text-base leading-relaxed text-gray-900 dark:text-gray-100 relative"
        onClick={() => {
          if (!editor?.isFocused) {
            editor?.commands.focus("end");
          }
        }}
        onDoubleClick={(e) => {
          if (readOnly) return;
          const rect = e.currentTarget.getBoundingClientRect();
          setPopupMenu({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
      >
        <EditorContent editor={editor} className="h-full" />

        <AnimatePresence>
          {popupMenu && (
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                left: popupMenu.x,
                top: popupMenu.y,
                transform: "translate(-50%, -100%)",
                zIndex: 50,
                marginTop: "-10px",
              }}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <Toolbar editor={editor} isPopup={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TappyEditor;
