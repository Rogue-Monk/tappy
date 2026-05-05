// src/components/editor/TappyEditor.tsx
import { useEditor, EditorContent } from "@tiptap/react";

// src/components/editor/Toolbar.tsx
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code
} from "lucide-react";
import { motion } from "framer-motion";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/editor/Toolbar.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  icon: Icon,
  title
}) => /* @__PURE__ */ jsx(
  motion.button,
  {
    whileHover: !disabled ? { scale: 1.05 } : {},
    whileTap: !disabled ? { scale: 0.95 } : {},
    onClick: (e) => {
      e.preventDefault();
      onClick();
    },
    disabled,
    title,
    className: cn(
      "p-2 rounded-lg transition-colors flex items-center justify-center",
      disabled && "opacity-40 cursor-not-allowed",
      !disabled && isActive && "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      !disabled && !isActive && "text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    ),
    children: /* @__PURE__ */ jsx(Icon, { size: 18, strokeWidth: isActive ? 2.5 : 2 })
  }
);
var ToolbarDivider = () => /* @__PURE__ */ jsx("div", { className: "w-[1px] h-6 bg-gray-200 dark:bg-gray-800 mx-1 self-center" });
var Toolbar = ({ editor, isPopup }) => {
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-wrap gap-1 p-2 bg-white/20 dark:bg-black/20 backdrop-blur-xl z-10",
        isPopup ? "border border-white/20 dark:border-white/10 rounded-2xl shadow-xl shadow-black/20 max-w-[320px] sm:max-w-[400px] justify-center" : "border-b border-white/20 dark:border-white/10 sticky top-0 rounded-t-2xl"
      ),
      children: [
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBold().run(),
            disabled: !editor.can().chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
            icon: Bold,
            title: "Bold"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleItalic().run(),
            disabled: !editor.can().chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
            icon: Italic,
            title: "Italic"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleStrike().run(),
            disabled: !editor.can().chain().focus().toggleStrike().run(),
            isActive: editor.isActive("strike"),
            icon: Strikethrough,
            title: "Strikethrough"
          }
        ),
        /* @__PURE__ */ jsx(ToolbarDivider, {}),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive("heading", { level: 1 }),
            icon: Heading1,
            title: "Heading 1"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive("heading", { level: 2 }),
            icon: Heading2,
            title: "Heading 2"
          }
        ),
        /* @__PURE__ */ jsx(ToolbarDivider, {}),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
            icon: List,
            title: "Bullet List"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive("orderedList"),
            icon: ListOrdered,
            title: "Ordered List"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive("blockquote"),
            icon: Quote,
            title: "Quote"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: editor.isActive("codeBlock"),
            icon: Code,
            title: "Code Block"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex-grow" }),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().chain().focus().undo().run(),
            icon: Undo,
            title: "Undo"
          }
        ),
        /* @__PURE__ */ jsx(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().redo().run(),
            disabled: !editor.can().chain().focus().redo().run(),
            icon: Redo,
            title: "Redo"
          }
        )
      ]
    }
  );
};
var Toolbar_default = Toolbar;

// src/components/editor/BubbleMenu.tsx
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import { Bold as Bold2, Italic as Italic2, Strikethrough as Strikethrough2, Link as LinkIcon, Code as Code2 } from "lucide-react";
import { motion as motion2 } from "framer-motion";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ToolbarButton2 = ({
  onClick,
  isActive,
  icon: Icon
}) => /* @__PURE__ */ jsx2(
  motion2.button,
  {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    onClick,
    className: cn(
      "p-1.5 rounded-md transition-colors",
      isActive ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" : "text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    ),
    children: /* @__PURE__ */ jsx2(Icon, { size: 16 })
  }
);
var BubbleMenu = ({ editor }) => {
  if (!editor) return null;
  return /* @__PURE__ */ jsxs2(
    TiptapBubbleMenu,
    {
      editor,
      className: "flex items-center gap-1 p-1 bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg shadow-xl shadow-black/10",
      children: [
        /* @__PURE__ */ jsx2(
          ToolbarButton2,
          {
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
            icon: Bold2
          }
        ),
        /* @__PURE__ */ jsx2(
          ToolbarButton2,
          {
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
            icon: Italic2
          }
        ),
        /* @__PURE__ */ jsx2(
          ToolbarButton2,
          {
            onClick: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive("strike"),
            icon: Strikethrough2
          }
        ),
        /* @__PURE__ */ jsx2(
          ToolbarButton2,
          {
            onClick: () => editor.chain().focus().toggleCode().run(),
            isActive: editor.isActive("code"),
            icon: Code2
          }
        ),
        /* @__PURE__ */ jsx2("div", { className: "w-[1px] h-4 bg-gray-200 dark:bg-gray-700 mx-1" }),
        /* @__PURE__ */ jsx2(
          ToolbarButton2,
          {
            onClick: () => {
              const previousUrl = editor.getAttributes("link").href;
              const url = window.prompt("URL", previousUrl);
              if (url === null) return;
              if (url === "") {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
                return;
              }
              editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            },
            isActive: editor.isActive("link"),
            icon: LinkIcon
          }
        )
      ]
    }
  );
};
var BubbleMenu_default = BubbleMenu;

// src/components/editor/Extensions.ts
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
var defaultExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3]
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-100 dark:bg-gray-800 p-4 font-mono text-sm"
      }
    }
  }),
  Placeholder.configure({
    placeholder: "Write something brilliant...",
    emptyEditorClass: "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-gray-400 before:dark:text-gray-600 before:pointer-events-none"
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-500 underline underline-offset-2 cursor-pointer"
    }
  }),
  Image.configure({
    HTMLAttributes: {
      class: "rounded-lg max-w-full h-auto shadow-md border border-gray-200 dark:border-gray-800"
    }
  }),
  CharacterCount.configure({ limit: 350 })
];

// src/components/editor/TappyEditor.tsx
import { useEffect, useState, useRef } from "react";
import { motion as motion3, AnimatePresence } from "framer-motion";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var TappyEditor = ({
  value = "",
  onChange,
  className,
  readOnly = false
}) => {
  const editor = useEditor({
    extensions: defaultExtensions,
    content: value,
    editable: !readOnly,
    immediatelyRender: false,
    onUpdate: ({ editor: editor2 }) => {
      var _a;
      onChange == null ? void 0 : onChange(editor2.getHTML());
      setCharacterCount(((_a = editor2.storage.characterCount) == null ? void 0 : _a.characters()) || 0);
    },
    editorProps: {
      attributes: {
        class: cn("focus:outline-none min-h-[150px] cursor-text pb-8")
      }
    }
  });
  const [popupMenu, setPopupMenu] = useState(
    null
  );
  const popupRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);
  useEffect(() => {
    var _a;
    if (editor) {
      setCharacterCount(((_a = editor.storage.characterCount) == null ? void 0 : _a.characters()) || 0);
    }
  }, [editor, value]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
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
  useEffect(() => {
    if (editor && value && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);
  const characterLimit = 350;
  const percentage = Math.min(100, Math.round(characterCount / characterLimit * 100));
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - percentage / 100 * circumference;
  let indicatorColor = "text-green-500";
  if (characterCount >= 101 && characterCount <= 240) {
    indicatorColor = "text-gray-500 dark:text-gray-400";
  } else if (characterCount >= 241 && characterCount <= 310) {
    indicatorColor = "text-yellow-500";
  } else if (characterCount >= 311) {
    indicatorColor = "text-red-500";
  }
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: cn(
        "w-full bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300",
        "focus-within:ring-2 focus-within:ring-white/40 dark:focus-within:ring-white/40 focus-within:border-white/40 dark:focus-within:border-white/40 focus-within:shadow-md",
        className
      ),
      children: [
        !readOnly && /* @__PURE__ */ jsx3(Toolbar_default, { editor }),
        !readOnly && /* @__PURE__ */ jsx3(BubbleMenu_default, { editor }),
        /* @__PURE__ */ jsxs3(
          "div",
          {
            className: "flex-grow p-4 sm:p-6 text-base leading-relaxed text-gray-900 dark:text-gray-100 relative",
            onClick: () => {
              if (!(editor == null ? void 0 : editor.isFocused)) {
                editor == null ? void 0 : editor.commands.focus("end");
              }
            },
            onDoubleClick: (e) => {
              if (readOnly) return;
              const rect = e.currentTarget.getBoundingClientRect();
              setPopupMenu({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
              });
            },
            children: [
              /* @__PURE__ */ jsx3(EditorContent, { editor, className: "h-full" }),
              /* @__PURE__ */ jsx3(AnimatePresence, { children: popupMenu && /* @__PURE__ */ jsx3(
                motion3.div,
                {
                  ref: popupRef,
                  initial: { opacity: 0, scale: 0.95, y: 10 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.95, y: 10 },
                  transition: { duration: 0.15 },
                  style: {
                    position: "absolute",
                    left: popupMenu.x,
                    top: popupMenu.y,
                    transform: "translate(-50%, -100%)",
                    zIndex: 50,
                    marginTop: "-10px"
                  },
                  onDoubleClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsx3(Toolbar_default, { editor, isPopup: true })
                }
              ) }),
              /* @__PURE__ */ jsxs3("div", { className: "absolute bottom-4 right-4 flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium bg-white/30 dark:bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 dark:border-white/10 shadow-sm", children: [
                /* @__PURE__ */ jsxs3("span", { children: [
                  characterCount,
                  " / ",
                  characterLimit
                ] }),
                /* @__PURE__ */ jsxs3("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: "-rotate-90", children: [
                  /* @__PURE__ */ jsx3(
                    "circle",
                    {
                      className: "text-gray-200 dark:text-gray-800",
                      strokeWidth: "3",
                      stroke: "currentColor",
                      fill: "transparent",
                      r: radius,
                      cx: "12",
                      cy: "12"
                    }
                  ),
                  /* @__PURE__ */ jsx3(
                    "circle",
                    {
                      className: cn("transition-all duration-300 ease-in-out", indicatorColor),
                      strokeWidth: "3",
                      strokeDasharray: circumference,
                      strokeDashoffset,
                      strokeLinecap: "round",
                      stroke: "currentColor",
                      fill: "transparent",
                      r: radius,
                      cx: "12",
                      cy: "12"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
};
export {
  TappyEditor,
  defaultExtensions
};
//# sourceMappingURL=index.mjs.map