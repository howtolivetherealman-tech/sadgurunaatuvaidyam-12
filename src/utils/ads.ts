/**
 * Private Ads & Google Ads Management Utilities
 */
import { extractYouTubeId } from './youtube.ts';

export interface PrivateAd {
  id: string;
  title: string;
  category: string;
  description: string;
  contactNumber: string;
  city?: string;
  imageUrl?: string;
  photos?: string[];
  youtubeUrl?: string;
  youtubeId?: string;
  targetLink?: string;
  status: 'approved' | 'pending' | 'rejected';
  submittedAt: number;
  approvedAt?: number;
  featured?: boolean;
}

export interface GoogleAdsConfig {
  enabled: boolean;
  clientScriptUrl?: string;
  adClient: string;
  adSlotBanner: string;
  customHtmlSnippet?: string;
}

export function validatePrivateAdSubmission(ad: Partial<PrivateAd>): { isValid: boolean; error?: string } {
  if (!ad.title || ad.title.trim().length < 3) {
    return { isValid: false, error: 'శీర్షిక (Title) కనీసం 3 అక్షరాలు ఉండాలి / Title must be at least 3 characters' };
  }
  if (!ad.description || ad.description.trim().length < 10) {
    return { isValid: false, error: 'వివరణ (Description) కనీసం 10 అక్షరాలు ఉండాలి / Description must be at least 10 characters' };
  }
  const cleanPhone = (ad.contactNumber || '').replace(/[^0-9]/g, '');
  if (cleanPhone.length < 10) {
    return { isValid: false, error: 'చెల్లుబాటు అయ్యే 10 అంకెల ఫోన్ నంబర్ ఇవ్వండి / Enter valid 10-digit phone number' };
  }
  if (ad.youtubeUrl && ad.youtubeUrl.trim().length > 0) {
    const ytId = extractYouTubeId(ad.youtubeUrl.trim());
    if (!ytId) {
      return { isValid: false, error: 'చెల్లుబాటు అయ్యే యూట్యూబ్ లింక్ ఇవ్వండి / Please enter a valid YouTube link' };
    }
  }
  return { isValid: true };
}

export function createPendingPrivateAd(data: {
  title: string;
  category: string;
  description: string;
  contactNumber: string;
  city?: string;
  imageUrl?: string;
  photos?: string[];
  youtubeUrl?: string;
  targetLink?: string;
  status?: 'approved' | 'pending';
}): PrivateAd {
  const cleanPhotos = Array.isArray(data.photos) ? data.photos.filter(Boolean) : [];
  const primaryImage = data.imageUrl?.trim() || cleanPhotos[0] || '';
  const ytId = data.youtubeUrl ? extractYouTubeId(data.youtubeUrl.trim()) || '' : '';

  return {
    id: `ad_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: data.title.trim(),
    category: data.category.trim() || 'General / సాధారణం',
    description: data.description.trim(),
    contactNumber: data.contactNumber.trim(),
    city: data.city?.trim() || '',
    imageUrl: primaryImage,
    photos: cleanPhotos.length > 0 ? cleanPhotos : (primaryImage ? [primaryImage] : []),
    youtubeUrl: data.youtubeUrl?.trim() || '',
    youtubeId: ytId,
    targetLink: data.targetLink?.trim() || '',
    status: data.status || 'pending',
    submittedAt: Date.now(),
    approvedAt: data.status === 'approved' ? Date.now() : undefined,
  };
}

export function approveAd(ads: PrivateAd[], adId: string): PrivateAd[] {
  return ads.map((ad) =>
    ad.id === adId
      ? { ...ad, status: 'approved', approvedAt: Date.now() }
      : ad
  );
}

export function rejectAd(ads: PrivateAd[], adId: string): PrivateAd[] {
  return ads.map((ad) =>
    ad.id === adId
      ? { ...ad, status: 'rejected' }
      : ad
  );
}

export function deleteAd(ads: PrivateAd[], adId: string): PrivateAd[] {
  return ads.filter((ad) => ad.id !== adId);
}
