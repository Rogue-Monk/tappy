import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import { VideoEmbed } from "./extensions/VideoEmbed";

export const defaultExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-100 dark:bg-gray-800 p-4 font-mono text-sm",
      },
    },
  }),
  Placeholder.configure({
    placeholder: "Write something brilliant...",
    emptyEditorClass:
      "cursor-text before:content-[attr(data-placeholder)] before:absolute before:text-gray-400 before:dark:text-gray-600 before:pointer-events-none",
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-500 underline underline-offset-2 cursor-pointer",
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: "rounded-lg max-w-full h-auto shadow-md border border-gray-200 dark:border-gray-800",
    },
  }),
  CharacterCount.configure({ limit: 350 }),
  VideoEmbed,
];
