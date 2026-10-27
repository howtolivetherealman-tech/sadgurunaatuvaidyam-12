import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePrivateAdSubmission,
  createPendingPrivateAd,
  approveAd,
  rejectAd,
  deleteAd,
} from './ads.ts';
import type { PrivateAd } from './ads.ts';
import {
  createYantraProduct,
  updateYantraImage,
  yantrasCatalog,
} from '../data/yantrasAndPuja.ts';

test('validatePrivateAdSubmission checks required fields, phone, and optional YouTube link', () => {
  const invalid = validatePrivateAdSubmission({
    title: 'Hi',
    description: 'Short',
    contactNumber: '123',
  });
  assert.equal(invalid.isValid, false);

  const invalidYt = validatePrivateAdSubmission({
    title: 'Traditional Ayurvedic Store',
    description: 'Organic herbs and original puja samagri available in Hyderabad',
    contactNumber: '7093586539',
    youtubeUrl: 'not-a-valid-youtube-link',
  });
  assert.equal(invalidYt.isValid, false);

  const validWithYtAndPhotos = validatePrivateAdSubmission({
    title: 'Traditional Ayurvedic Store',
    description: 'Organic herbs and original puja samagri available in Hyderabad with full details',
    contactNumber: '7093586539',
    youtubeUrl: 'https://www.youtube.com/watch?v=Vn_y9SOt3OU',
    photos: ['data:image/jpeg;base64,/9j/4AAQSkZJRg=='],
  });
  assert.equal(validWithYtAndPhotos.isValid, true);
});

test('createPendingPrivateAd stores photos, youtubeId, and full description', () => {
  const pendingAd = createPendingPrivateAd({
    title: 'Lakshmi Kuber Puja Samagri',
    category: 'Puja Samagri',
    description: 'Pure copper yantras, rudraksha malas, and camphor available with full description.',
    contactNumber: '7093586539',
    youtubeUrl: 'https://youtu.be/Vn_y9SOt3OU',
    photos: ['data:image/jpeg;base64,AAA', 'data:image/jpeg;base64,BBB'],
  });

  assert.equal(pendingAd.status, 'pending');
  assert.equal(pendingAd.youtubeId, 'Vn_y9SOt3OU');
  assert.equal(pendingAd.photos?.length, 2);
  assert.equal(pendingAd.imageUrl, 'data:image/jpeg;base64,AAA');

  const adsList: PrivateAd[] = [pendingAd];
  const approvedList = approveAd(adsList, pendingAd.id);

  assert.equal(approvedList[0].status, 'approved');
  assert.ok(approvedList[0].approvedAt);

  const rejectedList = rejectAd(approvedList, pendingAd.id);
  assert.equal(rejectedList[0].status, 'rejected');

  const emptyList = deleteAd(rejectedList, pendingAd.id);
  assert.equal(emptyList.length, 0);
});

test('createYantraProduct and updateYantraImage allow admin to add products and edit images', () => {
  const newProduct = createYantraProduct({
    nameTe: 'వారాహి దేవి సిద్ధ యంత్రం',
    purposeTe: 'శత్రు జయం మరియు ఆర్థిక అభివృద్ధి కొరకు',
    metalTe: 'పంచలోహం (Panchaloha)',
    imageUrl: 'data:image/jpeg;base64,YANTRA_IMG',
  });
  assert.equal(newProduct.nameTe, 'వారాహి దేవి సిద్ధ యంత్రం');
  assert.equal(newProduct.imageUrl, 'data:image/jpeg;base64,YANTRA_IMG');

  const updatedCatalog = updateYantraImage(
    yantrasCatalog,
    'sri-maha-yantra',
    'data:image/jpeg;base64,UPDATED_SRI_YANTRA'
  );
  const found = updatedCatalog.find((i) => i.id === 'sri-maha-yantra');
  assert.equal(found?.imageUrl, 'data:image/jpeg;base64,UPDATED_SRI_YANTRA');
});
