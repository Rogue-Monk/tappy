# Tappy Editor

Tappy is a premium, high-performance, and standalone rich-text editor component built with React, Tiptap, Tailwind CSS, and Framer Motion. It features smooth animations, a configurable toolbar, and a focus on portability for seamless integration into other web applications.

## Installation

You can install Tappy into your own project via npm (once published or linked):

```bash
npm install tappy
```

Tappy requires the following peer dependencies:
- `react`
- `react-dom`
- `framer-motion`
- `lucide-react`
- `@tiptap/*` packages

## Usage

Import the editor and its required CSS into your project:

```tsx
import { useState } from "react";
import { TappyEditor } from "tappy";
import "tappy/style.css"; // Required for Tailwind styles

export default function MyEditorPage() {
  const [content, setContent] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-10">
      <TappyEditor 
        value={content} 
        onChange={setContent} 
      />
    </div>
  );
}
```

## Development

Tappy includes a Next.js playground for local development.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the Next.js development server:
   ```bash
   npm run dev
   ```

3. Build the standalone library:
   ```bash
   npm run build
   ```
   This will generate the `dist/` directory containing the bundled JS and CSS.
