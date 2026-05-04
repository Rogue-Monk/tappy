import { type Editor } from "@tiptap/react";
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
  Code,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  editor: Editor | null;
  isPopup?: boolean;
};

const ToolbarButton = ({
  onClick,
  isActive,
  disabled,
  icon: Icon,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ElementType;
  title?: string;
}) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.05 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    disabled={disabled}
    title={title}
    className={cn(
      "p-2 rounded-lg transition-colors flex items-center justify-center",
      disabled && "opacity-40 cursor-not-allowed",
      !disabled && isActive && "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      !disabled && !isActive && "text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    )}
  >
    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
  </motion.button>
);

const ToolbarDivider = () => (
  <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-800 mx-1 self-center" />
);

const Toolbar = ({ editor, isPopup }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div 
      className={cn(
        "flex flex-wrap gap-1 p-2 bg-white/80 dark:bg-[#0a0a0a] backdrop-blur-md z-10",
        isPopup 
          ? "border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl shadow-black/20 max-w-[320px] sm:max-w-[400px] justify-center" 
          : "border-b border-gray-200 dark:border-gray-800 sticky top-0 rounded-t-2xl"
      )}
    >
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        icon={Bold}
        title="Bold"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        icon={Italic}
        title="Italic"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        icon={Strikethrough}
        title="Strikethrough"
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        icon={Heading1}
        title="Heading 1"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        icon={Heading2}
        title="Heading 2"
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        icon={List}
        title="Bullet List"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        icon={ListOrdered}
        title="Ordered List"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        icon={Quote}
        title="Quote"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        icon={Code}
        title="Code Block"
      />

      <div className="flex-grow" />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        icon={Undo}
        title="Undo"
      />
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        icon={Redo}
        title="Redo"
      />
    </div>
  );
};

export default Toolbar;
