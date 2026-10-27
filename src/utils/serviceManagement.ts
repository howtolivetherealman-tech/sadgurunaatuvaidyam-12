import { SpiritualService, servicesData } from '../data/services.ts';

export interface CreateServiceInput {
  category: 'tantra' | 'herbal' | 'relationship' | 'astrology';
  titleTe: string;
  titleEn?: string;
  shortDescTe: string;
  shortDescEn?: string;
  fullDescTe?: string;
  fullDescEn?: string;
  remedyTe: string;
  remedyEn?: string;
  badgeTe?: string;
  badgeEn?: string;
  iconName?: string;
}

export function validateServiceInput(input: CreateServiceInput): { valid: boolean; error?: string } {
  if (!input.titleTe || input.titleTe.trim().length === 0) {
    return { valid: false, error: 'సేవ శీర్షిక (తెలుగు) తప్పనిసరిగా నమోదు చేయాలి.' };
  }
  if (!input.shortDescTe || input.shortDescTe.trim().length === 0) {
    return { valid: false, error: 'సంక్షిప్త వివరణ (తెలుగు) తప్పనిసరిగా నమోదు చేయాలి.' };
  }
  if (!input.remedyTe || input.remedyTe.trim().length === 0) {
    return { valid: false, error: 'ప్రత్యేక పరిహారం (తెలుగు) తప్పనిసరిగా నమోదు చేయాలి.' };
  }
  return { valid: true };
}

export function createSpiritualService(input: CreateServiceInput): SpiritualService {
  const cleanTitleTe = input.titleTe.trim();
  const idSlug = cleanTitleTe
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 30);
  
  const id = `service-${Date.now()}-${idSlug || 'custom'}`;

  return {
    id,
    category: input.category || 'tantra',
    titleTe: cleanTitleTe,
    titleEn: (input.titleEn && input.titleEn.trim()) || cleanTitleTe,
    shortDescTe: input.shortDescTe.trim(),
    shortDescEn: (input.shortDescEn && input.shortDescEn.trim()) || input.shortDescTe.trim(),
    fullDescTe: (input.fullDescTe && input.fullDescTe.trim()) || input.shortDescTe.trim(),
    fullDescEn: (input.fullDescEn && input.fullDescEn.trim()) || (input.shortDescEn && input.shortDescEn.trim()) || input.shortDescTe.trim(),
    remedyTe: input.remedyTe.trim(),
    remedyEn: (input.remedyEn && input.remedyEn.trim()) || input.remedyTe.trim(),
    badgeTe: (input.badgeTe && input.badgeTe.trim()) || 'ప్రత్యేక పరిహారం',
    badgeEn: (input.badgeEn && input.badgeEn.trim()) || 'Special Remedy',
    iconName: input.iconName || 'Flame',
  };
}

export function addServiceToList(currentServices: SpiritualService[], newService: SpiritualService): SpiritualService[] {
  // Prepends new service so it appears at #1 position immediately
  return [newService, ...currentServices.filter((s) => s.id !== newService.id)];
}

export function removeServiceFromList(currentServices: SpiritualService[], serviceId: string): SpiritualService[] {
  return currentServices.filter((s) => s.id !== serviceId);
}

export function resetServicesToDefault(): SpiritualService[] {
  return [...servicesData];
}
