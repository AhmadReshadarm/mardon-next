const baseUrl = 'https://nbhoz.ru';
const FALLBACK_BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const BRAND_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  btoa(
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"><rect width="100%" height="100%" fill="#e3e0d3"/></svg>',
  );

export { baseUrl, FALLBACK_BLUR_DATA_URL, BRAND_BLUR_DATA_URL };
