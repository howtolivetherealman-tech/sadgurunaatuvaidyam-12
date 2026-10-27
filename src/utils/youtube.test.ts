import test from 'node:test';
import assert from 'node:assert/strict';
import { extractYouTubeId, createYouTubeVideo, prependVideo } from './youtube.ts';
import type { YouTubeVideo } from './youtube.ts';

test('extractYouTubeId parses standard watch URL', () => {
  const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  assert.equal(extractYouTubeId(url), 'dQw4w9WgXcQ');
});

test('extractYouTubeId parses youtu.be shortlinks with query params', () => {
  const url = 'https://youtu.be/dQw4w9WgXcQ?si=abcdefgh123';
  assert.equal(extractYouTubeId(url), 'dQw4w9WgXcQ');
});

test('extractYouTubeId parses shorts URLs', () => {
  const url = 'https://www.youtube.com/shorts/dQw4w9WgXcQ';
  assert.equal(extractYouTubeId(url), 'dQw4w9WgXcQ');
});

test('extractYouTubeId parses iframe embed snippets', () => {
  const snippet = '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player"></iframe>';
  assert.equal(extractYouTubeId(snippet), 'dQw4w9WgXcQ');
});

test('createYouTubeVideo and prependVideo places latest uploaded video at index 0', () => {
  const video1 = createYouTubeVideo({
    url: 'https://youtu.be/11111111111',
    title: 'First Remedy Video',
  });
  const video2 = createYouTubeVideo({
    url: 'https://youtu.be/22222222222',
    title: 'Newest Uploaded Video',
  });

  const list: YouTubeVideo[] = [video1];
  const updated = prependVideo(list, video2);

  assert.equal(updated.length, 2);
  assert.equal(updated[0].youtubeId, '22222222222'); // Newest is 1st!
  assert.equal(updated[1].youtubeId, '11111111111');
});
