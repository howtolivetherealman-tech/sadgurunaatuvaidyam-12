import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HOSTINGER_FILES_MANIFEST,
  generateHostingerHtaccess,
  generateHostingerRobotsTxt,
  generateHostingerSitemapXml,
  generateHostingerWebManifest,
  generateHostingerUploadGuide,
  getHostingerFileContentById,
} from './hostinger.ts';

test('HOSTINGER_FILES_MANIFEST includes all 7 essential Hostinger deployment items', () => {
  assert.equal(HOSTINGER_FILES_MANIFEST.length, 7);
  const filenames = HOSTINGER_FILES_MANIFEST.map((f) => f.filename);
  assert.deepEqual(filenames, [
    'hostinger-deploy.zip',
    'index.html',
    '.htaccess',
    'robots.txt',
    'sitemap.xml',
    'site.webmanifest',
    'HOSTINGER_UPLOAD_GUIDE.txt',
  ]);
});

test('generateHostingerHtaccess includes UTF-8, HTTPS redirect, GZIP, caching, and SPA fallback', () => {
  const htaccess = generateHostingerHtaccess();
  assert.ok(htaccess.includes('AddDefaultCharset UTF-8'));
  assert.ok(htaccess.includes('DirectoryIndex index.html'));
  assert.ok(htaccess.includes('RewriteEngine On'));
  assert.ok(htaccess.includes('https://%{HTTP_HOST}%{REQUEST_URI}'));
  assert.ok(htaccess.includes('RewriteRule . /index.html [L]'));
  assert.ok(htaccess.includes('AddOutputFilterByType DEFLATE text/html'));
});

test('generateHostingerRobotsTxt strips trailing slashes and references sitemap.xml', () => {
  const robots = generateHostingerRobotsTxt('https://sadgurunatuvaidyam.com///');
  assert.ok(robots.includes('User-agent: *'));
  assert.ok(robots.includes('Sitemap: https://sadgurunatuvaidyam.com/sitemap.xml'));
});

test('generateHostingerSitemapXml produces valid XML with bilingual hreflang and section anchors', () => {
  const xml = generateHostingerSitemapXml('https://sadgurunatuvaidyam.com', '2026-10-27');
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('hreflang="te"'));
  assert.ok(xml.includes('hreflang="en"'));
  assert.ok(xml.includes('<loc>https://sadgurunatuvaidyam.com/#services</loc>'));
  assert.ok(xml.includes('<loc>https://sadgurunatuvaidyam.com/#videos</loc>'));
  assert.ok(xml.includes('<loc>https://sadgurunatuvaidyam.com/#yantras</loc>'));
});

test('generateHostingerWebManifest returns valid JSON with Telugu name and theme colors', () => {
  const raw = generateHostingerWebManifest();
  const parsed = JSON.parse(raw);
  assert.equal(parsed.short_name, 'Sadguru Natu Vaidyam');
  assert.equal(parsed.display, 'standalone');
  assert.equal(parsed.background_color, '#090503');
  assert.equal(parsed.lang, 'te');
});

test('getHostingerFileContentById returns non-empty content for every text support file', () => {
  for (const id of ['htaccess', 'robots', 'sitemap', 'manifest', 'guide'] as const) {
    const content = getHostingerFileContentById(id);
    assert.ok(content.length > 50, `Expected content for ${id} to be non-empty`);
  }
  const guide = generateHostingerUploadGuide();
  assert.ok(guide.includes('public_html'));
  assert.ok(guide.includes('hpanel.hostinger.com'));
});
