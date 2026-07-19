import { useState } from 'react';
import data from '../lib/site';
import TornDivider from './ui/TornDivider';
import Star from './ui/Star';

const { about, personalInfo } = data;

// Tech stack SVG icons rendered inline for crisp rendering
const PythonIcon = () => (
  <div className="flex flex-col items-center gap-2">
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 128 128">
      <path fill="#3776AB" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" />
      <path fill="#FFD43B" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" />
    </svg>
    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Python</span>
  </div>
);

const FastAPIIcon = () => (
  <div className="flex flex-col items-center gap-2">
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 128 128">
      <circle cx="64" cy="64" r="60" fill="#049688" />
      <path fill="#fff" d="M69.5 20 34 70h24l-6.5 38L92 56H68l1.5-36z" />
    </svg>
    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">FastAPI</span>
  </div>
);

const DjangoIcon = () => (
  <div className="flex flex-col items-center gap-2">
    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="20" fill="#092E20" />
      <path fill="#fff" d="M53.7 24h14.6v67.3c-7.5 1.4-13 2-19 2-17.9 0-27.2-8.1-27.2-23.6 0-14.9 9.9-24.6 25.2-24.6 2.4 0 4.2.2 6.4.8V24zm0 33.6c-1.7-.6-3.1-.8-4.9-.8-7.4 0-11.6 4.5-11.6 12.4 0 7.7 4 12 11.5 12 1.6 0 2.9-.1 5-.4V57.6zM88.4 46.9v33.7c0 11.6-.9 17.2-3.4 22-2.4 4.6-5.5 7.5-12 10.7l-13.5-6.4c6.5-3 9.6-5.7 11.6-9.8 2.1-4.2 2.8-9.1 2.8-21.9V46.9h14.5zM73.9 24.1h14.5v14.9H73.9V24.1z" />
    </svg>
    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Django</span>
  </div>
);

const icons = { Python: PythonIcon, FastAPI: FastAPIIcon, Django: DjangoIcon };

const About = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="bg-[#ff2a2a] pt-20 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        {/* Left Side: ID Badge */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">

          <div data-aos="drop-bounce" className="relative flex justify-center w-full">
            {/* Lanyard string */}
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-black transform -translate-x-1/2 shadow-inner z-0"></div>
            {/* Lanyard clip */}
            <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gray-300 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.3)]"></div>

            {/* Badge Card */}
            <div className="bg-gray-900 w-full max-w-[280px] rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Cutout Hole */}
              <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gray-900 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-8 h-2 bg-black/30 rounded-full shadow-inner"></div>
              </div>
              {/* Image Container */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 border-2 border-transparent">
                <img
                  src={about.photo}
                  alt={`${personalInfo.name}, ${personalInfo.title}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="pt-3 pb-1 text-center">
                <p className="text-white font-black tracking-tight">{personalInfo.name}</p>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">{personalInfo.title}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Info Content */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20">

          <h2 className="text-4xl md:text-5xl font-black text-black mb-4">{about.heading}</h2>
          <p className="text-lg font-bold mb-6 leading-relaxed max-w-3xl text-red-50">
            Hi, my name is <span className="text-black text-xl font-black mx-1 tracking-wide uppercase">{personalInfo.name}</span>. {about.bio}
          </p>

          {/* Expandable "About Me" details */}
          <div
            className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
          >
            {about.more.map((line, i) => (
              <p key={i} className="text-base font-semibold leading-relaxed max-w-3xl text-red-100 mb-4">
                {line}
              </p>
            ))}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="px-6 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:bg-white hover:text-[#ff2a2a] transition-all duration-300 shadow-lg"
          >
            {expanded ? 'Show Less' : 'More About Me'}
          </button>

          {/* Horizontal Skills Row */}
          <div className="flex items-center gap-10 mt-10">
            {about.highlights.map((name, i) => {
              const Icon = icons[name];
              return Icon ? (
                <div
                  key={name}
                  data-aos="zoom-in"
                  data-aos-delay={300 + i * 150}
                  className="hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-2xl"
                >
                  <Icon />
                </div>
              ) : null;
            })}
          </div>

        </div>
      </div>

      <TornDivider position="bottom" />

      {/* Decorative stars */}
      <Star className="top-10 right-10 md:right-20 opacity-30" />
      <Star className="bottom-32 left-4 md:left-20 opacity-30" size="w-20 h-20" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default About;
