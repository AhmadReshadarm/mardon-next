import type { ImageLoader } from 'next/image';

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  if (src.startsWith('http') || src.startsWith('/')) return src;
  const [base, existingQuery] = src.split('?');
  const q = quality ?? 75;
  const params = new URLSearchParams(existingQuery || '');
  params.set('width', String(width));
  params.set('qlty', String(q));
  return `/api/images/compress/${base}?${params.toString()}`;
};

export default imageLoader;
