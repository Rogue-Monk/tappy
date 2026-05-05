import * as react_jsx_runtime from 'react/jsx-runtime';
import * as _tiptap_extension_image from '@tiptap/extension-image';
import * as _tiptap_extension_link from '@tiptap/extension-link';
import * as _tiptap_extensions from '@tiptap/extensions';
import * as _tiptap_core from '@tiptap/core';
import * as _tiptap_starter_kit from '@tiptap/starter-kit';

interface TappyEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    readOnly?: boolean;
}
declare const TappyEditor: ({ value, onChange, className, readOnly, }: TappyEditorProps) => react_jsx_runtime.JSX.Element;

declare const defaultExtensions: (_tiptap_core.Extension<_tiptap_starter_kit.StarterKitOptions, any> | _tiptap_core.Extension<_tiptap_extensions.PlaceholderOptions, any> | _tiptap_core.Mark<_tiptap_extension_link.LinkOptions, any> | _tiptap_core.Node<_tiptap_extension_image.ImageOptions, any> | _tiptap_core.Extension<_tiptap_extensions.CharacterCountOptions, _tiptap_extensions.CharacterCountStorage>)[];

export { TappyEditor, type TappyEditorProps, defaultExtensions };
