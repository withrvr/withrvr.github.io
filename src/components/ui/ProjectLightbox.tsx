"use client";

import dynamic from "next/dynamic";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

// next/dynamic keeps the whole library (and its CSS) out of the initial
// bundle; the chunk only loads the first time a project image is clicked.
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

export interface LightboxSlide {
  src: string;
  alt: string;
}

interface ProjectLightboxProps {
  slides: LightboxSlide[];
  index: number;
  open: boolean;
  onClose: () => void;
}

// Single shared instance for the whole Projects section (one lightbox, not
// one per card) so only one ever mounts. yet-another-react-lightbox handles
// Esc/backdrop close, arrow-key navigation, swipe and pinch-zoom (via the
// Zoom plugin), and background scroll lock on its own, so none of that needs
// reimplementing here. Two things it doesn't fully cover, both handled by the
// caller (Projects.tsx): it doesn't hide the prev/next arrows for a
// single-slide project on its own, and its focus-restore-on-close relies on
// the browser populating FocusEvent.relatedTarget, which only happens when
// the lightbox is opened via a real mouse click, not a keyboard-only
// Tab-then-Enter, so Projects.tsx also focuses the trigger button itself.
export default function ProjectLightbox({ slides, index, open, onClose }: ProjectLightboxProps) {
  if (!open) return null;
  const hideNav = slides.length <= 1;
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={slides}
      index={index}
      plugins={[Zoom]}
      zoom={{ maxZoomPixelRatio: 3 }}
      render={hideNav ? { buttonPrev: () => null, buttonNext: () => null } : undefined}
    />
  );
}
