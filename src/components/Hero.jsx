import { useRef, useState } from 'react';
import data from '../lib/site';
import SocialIcons from './SocialIcons';

const { hero, personalInfo } = data;

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play Reel: image by default; each click plays the talking video once
  // from the start (no loop). Clicking again — or the video ending —
  // returns to the hero image.
  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.currentTime = 0;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background: hero image, swapped for the talking video while playing */}
      <img
        src={hero.image}
        alt={personalInfo.name}
        fetchPriority="high"
        className={`absolute top-0 left-0 w-full h-full object-cover object-top z-0 transition-opacity duration-700 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        className={`absolute top-0 left-0 w-full h-full object-cover object-top z-0 transition-opacity duration-700 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={hero.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left Floating Social Bar for Large Screens */}
      <SocialIcons
        className="hidden lg:flex flex-col items-center gap-5 fixed left-6 top-1/2 -translate-y-1/2 z-50 px-3 py-5 rounded-full bg-black/20 border border-white/20 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        linkClass="text-white/90 hover:text-white transition-all duration-300 transform hover:scale-125"
      />

      {/* Content Container */}
      <div className="absolute inset-0 z-20 px-6 pb-20 md:pb-[8%] md:px-12 lg:pl-28 2xl:pl-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-left w-full">

        {/* Left Side: Text and Buttons */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full">
          {/* Mobile / Hero inline socials */}
          <div data-aos="fade-up" data-aos-delay="100" className="lg:hidden mb-4">
            <SocialIcons
              className="flex items-center gap-4"
              linkClass="text-white/90 hover:text-white transition-colors"
            />
          </div>

          {/* Main Heading */}
          <h1
            data-aos="fade-up"
            className="text-white text-3xl md:text-5xl font-bold mb-4 tracking-tight"
          >
            {hero.greeting}, <br /> <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">{hero.titleHighlight}</span>
          </h1>

          {/* Subheading */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-white text-sm md:text-lg font-semibold mb-8 max-w-md drop-shadow-md"
          >
            {hero.subtitle}
          </p>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-row flex-wrap items-center gap-3 w-full"
          >
            {/* Primary Button */}
            <a
              href={hero.ctaPrimary.href}
              className="px-4 py-2 md:px-6 md:py-2 text-xs md:text-base rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {hero.ctaPrimary.text}
            </a>

            {/* Secondary Button - Glassmorphism style */}
            <a
              href={hero.ctaSecondary.href}
              className="px-4 py-2 md:px-6 md:py-2 text-xs md:text-base rounded-full bg-black/40 border border-white text-white font-semibold hover:bg-black/60 transition-all duration-300 backdrop-blur-md"
            >
              {hero.ctaSecondary.text}
            </a>

            {/* Resume Download Button */}
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 md:px-6 md:py-2 text-xs md:text-base rounded-full bg-transparent border border-white/50 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {hero.ctaResume.text}
            </a>
          </div>
        </div>

        {/* Right Side: Play Reel Button */}
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={isPlaying ? 'Stop the intro video' : 'Play the intro video'}
          data-aos="zoom-in"
          data-aos-delay="600"
          className="mt-8 md:mt-0 flex flex-row md:flex-col items-center gap-2 md:gap-3 cursor-pointer group self-start md:self-auto"
        >
          <span className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex justify-center items-center group-hover:scale-110 group-hover:bg-[#ff2a2a] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,42,42,0.6)]">
            {!isPlaying ? (
              // Play Icon
              <svg className="w-5 h-5 md:w-8 md:h-8 text-white ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              // Stop Icon
              <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </span>
          <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            {!isPlaying ? 'Play Reel' : 'Stop'}
          </span>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
