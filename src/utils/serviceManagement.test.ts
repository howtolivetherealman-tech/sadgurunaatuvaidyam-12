import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateServiceInput,
  createSpiritualService,
  addServiceToList,
  removeServiceFromList,
  resetServicesToDefault,
} from './serviceManagement.ts';
import { SpiritualService } from '../data/services.ts';

test('validateServiceInput fails on missing required Telugu fields', () => {
  const emptyRes = validateServiceInput({
    category: 'tantra',
    titleTe: '',
    shortDescTe: 'వివరణ',
    remedyTe: 'పరిహారం',
  });
  assert.equal(emptyRes.valid, false);
  assert.ok(emptyRes.error?.includes('శీర్షిక'));

  const noDescRes = validateServiceInput({
    category: 'tantra',
    titleTe: 'పూజ',
    shortDescTe: '   ',
    remedyTe: 'పరిహారం',
  });
  assert.equal(noDescRes.valid, false);

  const noRemedyRes = validateServiceInput({
    category: 'tantra',
    titleTe: 'పూజ',
    shortDescTe: 'వివరణ',
    remedyTe: '',
  });
  assert.equal(noRemedyRes.valid, false);
});

test('validateServiceInput passes on complete input', () => {
  const validRes = validateServiceInput({
    category: 'herbal',
    titleTe: 'మూలికా రక్ష',
    shortDescTe: 'సర్వ రోగ నివారణి',
    remedyTe: 'సిద్ధ తైలం & కషాయం',
  });
  assert.equal(validRes.valid, true);
  assert.equal(validRes.error, undefined);
});

test('createSpiritualService assigns unique ID and populates English fallbacks gracefully', () => {
  const service = createSpiritualService({
    category: 'astrology',
    titleTe: 'కుబేర పాదుకా పూజ',
    shortDescTe: 'ధనాకర్షణ మరియు అప్పుల బాధల నివారణ.',
    remedyTe: 'స్వర్ణ కుబేర యంత్ర పూజ',
  });

  assert.ok(service.id.startsWith('service-'));
  assert.equal(service.titleTe, 'కుబేర పాదుకా పూజ');
  assert.equal(service.titleEn, 'కుబేర పాదుకా పూజ'); // Fallback to Telugu title if English not given
  assert.equal(service.category, 'astrology');
  assert.equal(service.iconName, 'Flame'); // default icon
  assert.equal(service.badgeTe, 'ప్రత్యేక పరిహారం');
});

test('addServiceToList prepends new service at position 0 (#1 in list)', () => {
  const initialList: SpiritualService[] = [
    {
      id: 'existing-1',
      category: 'tantra',
      titleTe: 'పాత సేవ 1',
      titleEn: 'Old Service 1',
      shortDescTe: 'వివరణ 1',
      shortDescEn: 'Desc 1',
      fullDescTe: 'పూర్తి 1',
      fullDescEn: 'Full 1',
      remedyTe: 'పరిహారం 1',
      remedyEn: 'Remedy 1',
      badgeTe: 'బ్యాడ్జ్',
      badgeEn: 'Badge',
      iconName: 'Flame',
    },
  ];

  const newService = createSpiritualService({
    category: 'herbal',
    titleTe: 'కొత్త మూలికా సేవ',
    shortDescTe: 'వివరణ',
    remedyTe: 'పరిహారం',
  });

  const updated = addServiceToList(initialList, newService);
  assert.equal(updated.length, 2);
  assert.equal(updated[0].id, newService.id);
  assert.equal(updated[1].id, 'existing-1');
});

test('removeServiceFromList removes the service with matching ID', () => {
  const list: SpiritualService[] = [
    {
      id: 's-1',
      category: 'tantra',
      titleTe: 'సేవ 1',
      titleEn: 'Service 1',
      shortDescTe: 'd1',
      shortDescEn: 'd1',
      fullDescTe: 'f1',
      fullDescEn: 'f1',
      remedyTe: 'r1',
      remedyEn: 'r1',
      badgeTe: 'b1',
      badgeEn: 'b1',
      iconName: 'Flame',
    },
    {
      id: 's-2',
      category: 'herbal',
      titleTe: 'సేవ 2',
      titleEn: 'Service 2',
      shortDescTe: 'd2',
      shortDescEn: 'd2',
      fullDescTe: 'f2',
      fullDescEn: 'f2',
      remedyTe: 'r2',
      remedyEn: 'r2',
      badgeTe: 'b2',
      badgeEn: 'b2',
      iconName: 'Leaf',
    },
  ];

  const afterRemoval = removeServiceFromList(list, 's-1');
  assert.equal(afterRemoval.length, 1);
  assert.equal(afterRemoval[0].id, 's-2');
});

test('resetServicesToDefault returns fresh default catalog with all 24 services', () => {
  const defaults = resetServicesToDefault();
  assert.equal(defaults.length, 24);
  assert.equal(defaults[0].id, 'vashikaran');

  const requiredIds = [
    'vashikaran',
    'husband-wife-disputes',
    'lovers-disputes',
    'lgbtq-relationships',
    'hijra-protection',
    'financial-problems',
    'workplace-boss-issues',
    'deaddiction-bad-habits',
    'alcohol-family-reform',
    'extramarital-husband-outside-women',
    'extramarital-wife-outside-men',
    'court-cases',
    'marugu-mandu-given',
    'marla-mandu-removal',
    'black-magic-removal',
    'energized-yantras',
    'delayed-marriage',
    'wealth-drain-lakshmi',
    'erectile-dysfunction-herbal',
    'premature-ejaculation-herbal',
    'nara-drishti-removal',
    'women-breast-enhancement-herbal',
    'marital-bliss-complete-health',
    'puja-articles-samagri',
  ];

  for (const id of requiredIds) {
    const found = defaults.find((s) => s.id === id);
    assert.ok(found, `Expected service with ID ${id} to exist`);
    assert.ok(found.titleTe.length > 0, `Expected titleTe for ${id}`);
    assert.ok(found.remedyTe.length > 0, `Expected remedyTe for ${id}`);
  }
});

