import data, { buildMailto } from '../lib/site';
import SocialIcons from './SocialIcons';

const { footer, personalInfo, socialLinks } = data;

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh]">

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium">
        <div className="flex flex-col gap-1">
          {footer.taglines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="flex flex-col gap-1 md:items-center">
          <p>{footer.credential}</p>
          <a href="#projects" className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1">View Work</a>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <p>{footer.availability}</p>
          <p>{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Middle Huge Text */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden">
        <h2 className="text-[18vw] md:text-[16vw] leading-none font-sans font-bold tracking-tighter lowercase select-none text-[#f4f4f4] w-full text-center">
          {footer.bigText}
        </h2>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold">Contact</a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            © {new Date().getFullYear()} {personalInfo.name} | Built with React
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-center">
          <a href={buildMailto()} className="underline hover:text-white transition-colors underline-offset-4 decoration-1 lowercase">
            {personalInfo.email}
          </a>
          <SocialIcons
            className="flex items-center gap-4 mt-2"
            linkClass="text-[#d4d4d4] hover:text-white transition-colors duration-300"
          />
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors underline-offset-4 decoration-1"
          >
            Explore My GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
