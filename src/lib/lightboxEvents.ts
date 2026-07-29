// Custom window event name shared between ProjectLightbox (dispatches) and
// Cursor (listens) so the custom cursor can step aside while a lightbox is
// open, without a global store: ProjectLightbox is the only dispatcher today,
// but any future fullscreen overlay can reuse the same signal.
export const LIGHTBOX_TOGGLE_EVENT = "lightbox:toggle";
