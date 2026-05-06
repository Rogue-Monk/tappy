export interface EmbedResult {
  src?: string;
  html?: string;
  platform: string;
  type: 'iframe' | 'card' | 'error';
  metadata?: {
    title?: string;
    description?: string;
    image?: string;
    site_name?: string;
  };
}

export interface EmbedResolver {
  id: string;
  match: (url: URL) => boolean;
  resolve: (url: URL) => Promise<EmbedResult>;
}

class EmbedService {
  private resolvers: EmbedResolver[] = [];

  registerResolver(resolver: EmbedResolver) {
    this.resolvers.push(resolver);
  }

  async resolveUrl(urlString: string): Promise<EmbedResult> {
    try {
      const url = new URL(urlString);
      
      for (const resolver of this.resolvers) {
        if (resolver.match(url)) {
          return await resolver.resolve(url);
        }
      }

      // Fallback: Return a generic link or attempt OpenGraph fetch if a proxy is configured
      return {
        platform: 'generic',
        type: 'card',
        metadata: {
          title: url.hostname,
          description: urlString,
        }
      };
    } catch (e) {
      return {
        platform: 'error',
        type: 'error',
        metadata: {
          title: 'Invalid URL',
        }
      };
    }
  }
}

export const embedService = new EmbedService();

// --- Default Resolvers ---

embedService.registerResolver({
  id: 'youtube',
  match: (url) => url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be'),
  resolve: async (url) => {
    let videoId = '';
    if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.slice(1);
    } else {
      videoId = url.searchParams.get('v') || '';
    }
    
    return {
      src: `https://www.youtube.com/embed/${videoId}`,
      platform: 'youtube',
      type: 'iframe',
    };
  }
});

embedService.registerResolver({
  id: 'vimeo',
  match: (url) => url.hostname.includes('vimeo.com'),
  resolve: async (url) => {
    const segments = url.pathname.split('/').filter(Boolean);
    const videoId = segments[segments.length - 1];
    return {
      src: `https://player.vimeo.com/video/${videoId}`,
      platform: 'vimeo',
      type: 'iframe',
    };
  }
});

embedService.registerResolver({
  id: 'instagram',
  match: (url) => url.hostname.includes('instagram.com'),
  resolve: async (url) => {
    // Basic match for /p/ or /reel/
    const match = url.pathname.match(/\/(p|reel)\/([a-zA-Z0-9_-]+)/);
    const id = match ? match[2] : '';
    return {
      src: `https://www.instagram.com/p/${id}/embed`,
      platform: 'instagram',
      type: 'iframe',
    };
  }
});

embedService.registerResolver({
  id: 'twitter',
  match: (url) => url.hostname.includes('twitter.com') || url.hostname.includes('x.com'),
  resolve: async (url) => {
    const match = url.pathname.match(/\/([a-zA-Z0-9_]+)\/status\/([0-9]+)/);
    if (match) {
      return {
        src: `https://twitframe.com/show?url=https://twitter.com/${match[1]}/status/${match[2]}`,
        platform: 'twitter',
        type: 'iframe',
      };
    }
    throw new Error("Invalid Twitter URL");
  }
});

embedService.registerResolver({
  id: 'reddit',
  match: (url) => url.hostname.includes('reddit.com'),
  resolve: async (url) => {
    return {
      src: `https://www.redditmedia.com${url.pathname}?embed=true`,
      platform: 'reddit',
      type: 'iframe',
    };
  }
});
