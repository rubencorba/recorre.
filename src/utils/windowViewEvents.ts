const WINDOW_VIEW_EVENT = 'tour:open-window-view';

/** Called from Pannellum hotspot handlers (outside React) to ask Tour to show a window photo. */
export function requestWindowView(image: string): void {
  window.dispatchEvent(new CustomEvent<string>(WINDOW_VIEW_EVENT, { detail: image }));
}

/** Subscribes to window-view requests; returns the unsubscribe function. */
export function subscribeToWindowViewRequests(listener: (image: string) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<string>).detail);
  window.addEventListener(WINDOW_VIEW_EVENT, handler);
  return () => window.removeEventListener(WINDOW_VIEW_EVENT, handler);
}