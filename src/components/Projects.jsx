import data from '../lib/site';
import { GitHubIcon, ExternalLinkIcon } from './SocialIcons';
import SectionHeader from './ui/SectionHeader';
import Chip from './ui/Chip';

const { projects, projectsSection, socialLinks } = data;

const ProjectImages = ({ project }) => {
  if (!project.images || project.images.length === 0) return null;

  if (project.imageLayout === 'phones') {
    // Portrait mobile screenshots side by side
    return (
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 max-w-md md:max-w-xl">
        {project.images.map((src, i) => (
          <div key={src} className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
            <img
              src={src}
              alt={`${project.title} screenshot ${i + 1}`}
              loading="lazy"
              className="w-full h-auto hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    );
  }

  // Single wide screenshot
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 mb-8">
      <img
        src={project.images[0]}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="w-full h-auto hover:scale-[1.02] transition-transform duration-700"
      />
    </div>
  );
};

const ProjectCard = ({ project, aosDelay }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={aosDelay}
    className={`relative rounded-2xl p-[1px] group transition-all duration-500 ${
      project.isFlagship
        ? 'bg-gradient-to-br from-red-500/50 via-white/10 to-red-500/30 hover:from-red-500 hover:via-red-400/30 hover:to-red-500/60'
        : 'bg-white/10 hover:bg-white/20'
    }`}
  >
    <div className={`rounded-2xl p-6 md:p-8 h-full backdrop-blur-md transition-all duration-500 ${
      project.isFlagship
        ? 'bg-[#0f0f0f]/95 group-hover:bg-[#0f0f0f]/90'
        : 'bg-[#111111]/90 group-hover:bg-[#111111]/80'
    }`}>
      {/* Badge */}
      {project.badge && (
        <span className="inline-block text-xs font-bold tracking-widest uppercase text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-4">
          {project.badge}
        </span>
      )}

      {/* Number + Title */}
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-5xl font-black text-white/10 font-serif italic">{project.number}</span>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{project.title}</h3>
      </div>

      {/* Screenshots */}
      <ProjectImages project={project} />

      {/* Description bullets (mirrors the resume) */}
      <ul className="text-white/60 text-sm md:text-base leading-relaxed mb-6 font-medium space-y-2 pl-5 list-disc marker:text-red-400">
        {project.bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.techTags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              link.icon === 'github'
                ? 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black'
                : 'bg-[#ff2a2a] text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,42,42,0.4)]'
            }`}
          >
            {link.icon === 'github' ? <GitHubIcon /> : <ExternalLinkIcon />}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="bg-[#0a0a0a] min-h-screen pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]">
      <div className="max-w-6xl mx-auto">

        <SectionHeader
          badge={projectsSection.badge}
          heading={<>Work that speaks <br className="hidden md:block" />for itself</>}
          description={projectsSection.description}
          align="left"
          size="lg"
          uppercase={false}
          className="mb-16 md:mb-20"
        />

        {/* Project Cards */}
        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              aosDelay={String((index + 1) * 100)}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <div data-aos="fade-up" data-aos-delay="500" className="mt-16 flex justify-center">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500 group"
          >
            <GitHubIcon />
            Explore All My Repositories
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
