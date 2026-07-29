"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Play, Square } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

interface HeroMediaProps {
  poster: string;
  video: string;
  alt: string;
}

// Poster image by default. A visible button plays the video once, then it stops
// and returns to the poster (on end or on a second click). No autoplay, no loop.
//
// Deliberately NOT muted: the clip has a spoken intro, so muting it silently
// threw away the whole point of the video. `muted` is only required to satisfy
// browser autoplay policy, and nothing here autoplays; play() is only ever
// called from the button's click handler below, and a user-initiated play is
// allowed to carry audio. playsInline is still needed, independently of audio,
// so iOS plays the clip in place instead of taking over the screen.
export default function HeroMedia({ poster, video, alt }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      el.currentTime = 0;
      setIsPlaying(false);
    } else {
      el.currentTime = 0;
      el
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="relative isolate h-full w-full overflow-hidden rounded-t-[999px] rounded-b-3xl bg-card">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 80vw, 380px"
        priority
        className={`object-cover object-center transition-opacity duration-700 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* macOS Chrome/WebKit promotes <video> to its own hardware-decode
          compositing layer once it starts playing, and that layer ignores the
          wrapper's border-radius + overflow-hidden clip, painting as a plain
          rectangle over the pill shape. Windows and mobile don't hit this
          because they don't promote the layer the same way. Putting the same
          radius directly on the video element clips its own layer instead of
          relying on the ancestor's clip. */}
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        poster={poster}
        onEnded={() => setIsPlaying(false)}
        className={`absolute inset-0 h-full w-full rounded-t-[999px] rounded-b-3xl object-cover object-center transition-opacity duration-700 ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Play / Stop: icon only, fixed size and color, with a soft glow pulse.
          Fixed size means toggling never shifts its position. */}
      <div className="absolute bottom-3 right-3 flex">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary"
          animate={{ scale: [1, 1.7], opacity: [0.45, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
        />
        <MagneticButton strength={0.35}>
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Stop the intro video" : "Play the intro video"}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/55 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110"
          >
            {isPlaying ? <Square size={13} /> : <Play size={14} className="ml-0.5" />}
          </button>
        </MagneticButton>
      </div>
    </div>
  );
}
