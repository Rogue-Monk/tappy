import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const EmbedWrapper = (props: NodeViewProps) => {
  const { node, selected, deleteNode } = props;
  const { src, platform } = node.attrs;

  // Determine aspect ratio class based on platform
  let aspectRatioClass = "aspect-video"; // default 16:9
  if (platform === "instagram") {
    aspectRatioClass = "aspect-square sm:aspect-[4/5]";
  } else if (platform === "twitter") {
    aspectRatioClass = "aspect-auto min-h-[400px]"; 
  } else if (platform === "reddit") {
    aspectRatioClass = "aspect-auto min-h-[500px]";
  }

  return (
    <NodeViewWrapper
      className={cn(
        "relative rounded-xl overflow-hidden my-6 border-2 transition-all duration-200 group",
        selected ? "border-blue-500 shadow-md ring-2 ring-blue-500/20" : "border-transparent",
      )}
    >
      <div className={cn("w-full h-full relative bg-gray-100 dark:bg-gray-800", aspectRatioClass)}>
        <iframe
          src={src}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
        
        {selected && (
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <button
              onClick={deleteNode}
              className="p-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
              title="Delete embed"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
