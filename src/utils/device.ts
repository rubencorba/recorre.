export const PORTRAIT_QUERY = '(orientation: portrait)';
export function isMobileUserAgent(): boolean {
  return typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('mobi');
}