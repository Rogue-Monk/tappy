"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  TappyEditor: () => TappyEditor,
  defaultExtensions: () => defaultExtensions
});
module.exports = __toCommonJS(index_exports);

// src/components/editor/TappyEditor.tsx
var import_react = require("@tiptap/react");

// src/components/editor/Toolbar.tsx
var import_lucide_react = require("lucide-react");
var import_framer_motion = require("framer-motion");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/editor/Toolbar.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  icon: Icon,
  title
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  import_framer_motion.motion.button,
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
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18, strokeWidth: isActive ? 2.5 : 2 })
  }
);
var ToolbarDivider = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[1px] h-6 bg-gray-200 dark:bg-gray-800 mx-1 self-center" });
var Toolbar = ({ editor, isPopup }) => {
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-wrap gap-1 p-2 bg-white/20 dark:bg-black/20 backdrop-blur-xl z-10",
        isPopup ? "border border-white/20 dark:border-white/10 rounded-2xl shadow-xl shadow-black/20 max-w-[320px] sm:max-w-[400px] justify-center" : "border-b border-white/20 dark:border-white/10 sticky top-0 rounded-t-2xl"
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBold().run(),
            disabled: !editor.can().chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
            icon: import_lucide_react.Bold,
            title: "Bold"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleItalic().run(),
            disabled: !editor.can().chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
            icon: import_lucide_react.Italic,
            title: "Italic"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleStrike().run(),
            disabled: !editor.can().chain().focus().toggleStrike().run(),
            isActive: editor.isActive("strike"),
            icon: import_lucide_react.Strikethrough,
            title: "Strikethrough"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarDivider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive("heading", { level: 1 }),
            icon: import_lucide_react.Heading1,
            title: "Heading 1"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive("heading", { level: 2 }),
            icon: import_lucide_react.Heading2,
            title: "Heading 2"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarDivider, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
            icon: import_lucide_react.List,
            title: "Bullet List"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive("orderedList"),
            icon: import_lucide_react.ListOrdered,
            title: "Ordered List"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive("blockquote"),
            icon: import_lucide_react.Quote,
            title: "Quote"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: editor.isActive("codeBlock"),
            icon: import_lucide_react.Code,
            title: "Code Block"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-grow" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().chain().focus().undo().run(),
            icon: import_lucide_react.Undo,
            title: "Undo"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ToolbarButton,
          {
            onClick: () => editor.chain().focus().redo().run(),
            disabled: !editor.can().chain().focus().redo().run(),
            icon: import_lucide_react.Redo,
            title: "Redo"
          }
        )
      ]
    }
  );
};
var Toolbar_default = Toolbar;

// src/components/editor/BubbleMenu.tsx
var import_menus = require("@tiptap/react/menus");
var import_lucide_react2 = require("lucide-react");
var import_framer_motion2 = require("framer-motion");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ToolbarButton2 = ({
  onClick,
  isActive,
  icon: Icon
}) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  import_framer_motion2.motion.button,
  {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    onClick,
    className: cn(
      "p-1.5 rounded-md transition-colors",
      isActive ? "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" : "text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    ),
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { size: 16 })
  }
);
var BubbleMenu = ({ editor }) => {
  if (!editor) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    import_menus.BubbleMenu,
    {
      editor,
      className: "flex items-center gap-1 p-1 bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-lg shadow-xl shadow-black/10",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ToolbarButton2,
          {
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
            icon: import_lucide_react2.Bold
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ToolbarButton2,
          {
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
            icon: import_lucide_react2.Italic
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ToolbarButton2,
          {
            onClick: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive("strike"),
            icon: import_lucide_react2.Strikethrough
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ToolbarButton2,
          {
            onClick: () => editor.chain().focus().toggleCode().run(),
            isActive: editor.isActive("code"),
            icon: import_lucide_react2.Code
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-[1px] h-4 bg-gray-200 dark:bg-gray-700 mx-1" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
            icon: import_lucide_react2.Link
          }
        )
      ]
    }
  );
};
var BubbleMenu_default = BubbleMenu;

// src/components/editor/Extensions.ts
var import_starter_kit = __toESM(require("@tiptap/starter-kit"));
var import_extension_placeholder = __toESM(require("@tiptap/extension-placeholder"));
var import_extension_link = __toESM(require("@tiptap/extension-link"));
var import_extension_image = __toESM(require("@tiptap/extension-image"));
var import_extension_character_count = __toESM(require("@tiptap/extension-character-count"));
var defaultExtensions = [
  import_starter_kit.default.configure({
    heading: {
      levels: [1, 2, 3]
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-100 dark:bg-gray-800 p-4 font-mono text-sm"
      }
    }
  }),
  import_extension_placeholder.default.configure({
    placeholder: "Write something brilliant...",
    emptyEditorClass: "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-gray-400 before:dark:text-gray-600 before:pointer-events-none"
  }),
  import_extension_link.default.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-500 underline underline-offset-2 cursor-pointer"
    }
  }),
  import_extension_image.default.configure({
    HTMLAttributes: {
      class: "rounded-lg max-w-full h-auto shadow-md border border-gray-200 dark:border-gray-800"
    }
  }),
  import_extension_character_count.default.configure({ limit: 350 })
];

// src/components/editor/TappyEditor.tsx
var import_react2 = require("react");
var import_framer_motion3 = require("framer-motion");
var import_jsx_runtime3 = require("react/jsx-runtime");
var TappyEditor = ({
  value = "",
  onChange,
  className,
  readOnly = false
}) => {
  const editor = (0, import_react.useEditor)({
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
  const [popupMenu, setPopupMenu] = (0, import_react2.useState)(
    null
  );
  const popupRef = (0, import_react2.useRef)(null);
  const [characterCount, setCharacterCount] = (0, import_react2.useState)(0);
  (0, import_react2.useEffect)(() => {
    var _a;
    if (editor) {
      setCharacterCount(((_a = editor.storage.characterCount) == null ? void 0 : _a.characters()) || 0);
    }
  }, [editor, value]);
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: cn(
        "w-full bg-white/20 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300",
        "focus-within:ring-2 focus-within:ring-white/40 dark:focus-within:ring-white/40 focus-within:border-white/40 dark:focus-within:border-white/40 focus-within:shadow-md",
        className
      ),
      children: [
        !readOnly && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Toolbar_default, { editor }),
        !readOnly && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(BubbleMenu_default, { editor }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react.EditorContent, { editor, className: "h-full" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_framer_motion3.AnimatePresence, { children: popupMenu && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                import_framer_motion3.motion.div,
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Toolbar_default, { editor, isPopup: true })
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "absolute bottom-4 right-4 flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium bg-white/30 dark:bg-black/30 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 dark:border-white/10 shadow-sm", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
                  characterCount,
                  " / ",
                  characterLimit
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", className: "-rotate-90", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TappyEditor,
  defaultExtensions
});
//# sourceMappingURL=index.js.map