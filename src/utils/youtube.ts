/**
 * YouTube URL Parser and Embed Helper
 * Handles standard watch URLs, youtu.be shortlinks, shorts, embed URLs, and iframe snippets.
 */

export interface YouTubeVideo {
  id: string;
  youtubeId: string;
  title: string;
  titleTe?: string;
  category: string;
  categoryTe?: string;
  embedUrl: string;
  thumbnailUrl: string;
  addedAt: number;
  featured?: boolean;
}

/**
 * Extracts YouTube 11-character video ID from varied URL formats or iframe snippets
 */
export function extractYouTubeId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const cleanInput = input.trim();

  // Handle iframe src if an embed snippet was pasted
  const iframeMatch = cleanInput.match(/src=["'](?:https?:)?\/\/www\.youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }

  // Regex for standard YouTube URLs, shorts, and youtu.be links
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const match = cleanInput.match(regExp);

  if (match && match[1]) {
    return match[1];
  }

  // If user pasted just the 11-character ID directly
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanInput)) {
    return cleanInput;
  }

  return null;
}

/**
 * Creates a valid YouTubeVideo object.
 * Throws error if URL cannot be parsed.
 */
export function createYouTubeVideo(params: {
  url: string;
  title: string;
  titleTe?: string;
  category?: string;
  categoryTe?: string;
  featured?: boolean;
}): YouTubeVideo {
  const youtubeId = extractYouTubeId(params.url);
  if (!youtubeId) {
    throw new Error('Invalid YouTube URL or Video ID');
  }

  return {
    id: `yt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    youtubeId,
    title: params.title.trim() || 'Sadguru Natu Vaidyam Video',
    titleTe: params.titleTe?.trim() || params.title.trim() || 'సద్గురు నాటు వైద్యం వీడియో',
    category: params.category || 'Tantra & Herbal Remedies',
    categoryTe: params.categoryTe || 'తంత్ర & నాటు వైద్యం',
    embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`,
    thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    addedAt: Date.now(),
    featured: !!params.featured,
  };
}

/**
 * Inserts a new video at the beginning of the list (Index 0)
 * ensures newly added videos always appear first as requested.
 */
export function prependVideo(list: YouTubeVideo[], newVideo: YouTubeVideo): YouTubeVideo[] {
  // Prevent duplicate youtubeId if already present, or move to top
  const filtered = list.filter((v) => v.youtubeId !== newVideo.youtubeId);
  return [newVideo, ...filtered];
}
