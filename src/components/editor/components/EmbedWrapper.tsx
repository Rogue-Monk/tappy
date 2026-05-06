import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { Trash2, Loader2, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PreviewCard } from './PreviewCard';

export const EmbedWrapper = (props: NodeViewProps) => {
  const { node, selected, deleteNode } = props;
  const { src, platform, embedType, originalUrl, metadata, isLoading } = node.attrs;
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  if (isLoading) {
    return (
      <NodeViewWrapper className="my-6">
        <div className="w-full flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin mr-3" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading embed for {originalUrl}...</span>
        </div>
      </NodeViewWrapper>
    );
  }

  if (embedType === 'error') {
    return (
      <NodeViewWrapper className="my-6">
        <div className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/30">
          <div className="flex items-center">
            <Link2 className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">Failed to load embed: {originalUrl}</span>
          </div>
          {selected && (
            <button onClick={deleteNode} className="p-1 hover:bg-red-100 dark:hover:bg-red-900/50 rounded transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </NodeViewWrapper>
    );
  }

  if (embedType === 'card') {
    return (
      <NodeViewWrapper className="relative group">
        <PreviewCard url={originalUrl} metadata={metadata} />
        {selected && (
          <div className="absolute top-2 right-2 z-20 flex gap-2">
            <button
              onClick={deleteNode}
              className="p-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-colors"
              title="Delete embed"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </NodeViewWrapper>
    );
  }

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
        {isIframeLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm z-10 animate-pulse">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading iframe...</span>
          </div>
        )}
        {src && (
          <iframe
            src={src}
            className={cn(
              "absolute inset-0 w-full h-full border-0 transition-opacity duration-500",
              isIframeLoading ? "opacity-0" : "opacity-100"
            )}
            allowFullScreen
            onLoad={() => setIsIframeLoading(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        )}
        
        {selected && (
          <div className="absolute top-2 right-2 z-20 flex gap-2">
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
