import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import data, { buildMailto, buildGmailCompose } from '../lib/site';
import SocialIcons from './SocialIcons';

const Contact = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-gray-900">
      {/* Huge Background Text */}
      <motion.div
        style={{ y }}
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <div
          className="text-[25vw] leading-[0.75] font-black text-white uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </div>
      </motion.div>

      {/* Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div
          data-aos="fade-up"
          className="bg-[#ff2a2a] w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col gap-12"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
            <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-90">
              Reach Me
            </div>
            <SocialIcons
              className="flex items-center gap-3"
              iconClass="w-4 h-4"
              linkClass="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-red-600 border border-white/20 transition-all duration-300"
            />
          </div>

          <div className="flex flex-col gap-6 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Have an opportunity or an idea? <br className="hidden md:block" />
              My inbox is open.
            </h2>
            <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-xl">
              Click below to open a message already addressed to me,
              subject and greeting included.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10 pb-4">
            <a
              href={buildGmailCompose()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 self-start px-8 py-4 rounded-full bg-white text-[#ff2a2a] font-black text-lg hover:bg-black hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.25)] group"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Say Hello
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <div className="text-xs md:text-sm text-white/80 font-medium flex flex-col gap-1 sm:text-right">
              <p>Prefer plain email? Write to</p>
              <a href={buildMailto()} className="underline underline-offset-4 decoration-1 font-bold hover:text-white transition-colors lowercase">
                {data.personalInfo.email}
              </a>
              <p className="mt-2 opacity-80">I typically respond within 24–48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
