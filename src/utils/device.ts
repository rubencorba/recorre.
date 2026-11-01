/** Matches a viewport in portrait orientation. Says nothing about the device type. */
export const PORTRAIT_QUERY = '(orientation: portrait)';
/**
 * Detects a mobile device the same way Pannellum itself does internally
 * (to decide whether to show its VR/orientation button): sniffing the
 * user agent for "mobi". Unlike a viewport media query, this doesn't
 * change when the device is rotated or when a desktop window is resized.
 */
export function isMobileUserAgent(): boolean {
  return typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('mobi');
}