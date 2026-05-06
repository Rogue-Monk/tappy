import React from 'react';
import { ExternalLink } from 'lucide-react';

interface PreviewCardProps {
  url: string;
  metadata?: {
    title?: string;
    description?: string;
    image?: string;
    site_name?: string;
  };
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ url, metadata }) => {
  const { title, description, image, site_name } = metadata || {};
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block no-underline"
      contentEditable={false}
    >
      <div className="flex flex-col sm:flex-row border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 my-4 max-w-2xl bg-white dark:bg-black/40">
        {image && (
          <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-100 dark:bg-gray-800 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={image} 
              alt={title || "Link preview"} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4 flex flex-col justify-center flex-grow overflow-hidden">
          {site_name && (
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
              {site_name}
            </div>
          )}
          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
            {title || url}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
              {description}
            </p>
          )}
          <div className="flex items-center text-xs text-blue-500 font-medium mt-auto break-all">
            <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">{url}</span>
          </div>
        </div>
      </div>
    </a>
  );
};
