export const extractUrlId = (url: string): string => {
  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  return cleanUrl.split('/').pop() || '';
};