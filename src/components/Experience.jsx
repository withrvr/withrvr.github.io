import data from '../lib/site';
import TornDivider from './ui/TornDivider';
import Star from './ui/Star';

const { experience, experienceSection } = data;

const ExperienceCard = ({ job, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 150}
    className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-black/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500"
  >
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
      <div>
        <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight">
          {job.role}
        </h3>
        <p className="text-red-200 text-sm md:text-base font-black tracking-wide uppercase mt-1">
          {job.company}
        </p>
      </div>
      <div className="sm:text-right shrink-0">
        <p className="text-white/70 text-xs md:text-sm font-mono font-bold tracking-widest uppercase">
          {job.duration}
        </p>
        <p className="text-white/50 text-xs font-mono tracking-wider mt-1">{job.location}</p>
      </div>
    </div>

    <p className="text-red-100/90 text-sm font-semibold italic mb-6">{job.subtitle}</p>

    <ul className="text-white/90 text-sm md:text-[15px] font-medium space-y-2 pl-5 list-disc marker:text-red-200 md:columns-1">
      {job.bullets.map((bullet, i) => (
        <li key={i} className="leading-relaxed">{bullet}</li>
      ))}
    </ul>
  </div>
);

const Experience = () => {
  return (
    <section id="experience" className="bg-[#ff2a2a] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans">

      <TornDivider position="top" />

      <div className="max-w-6xl mx-auto relative z-20">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 md:mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight uppercase">
            {experienceSection.heading}
          </h2>
          <p className="text-red-100 text-base md:text-lg font-semibold max-w-lg mx-auto">
            {experienceSection.description}
          </p>
        </div>

        {/* Experience Cards */}
        <div className="flex flex-col gap-6 md:gap-8">
          {experience.map((job, index) => (
            <ExperienceCard key={job.company} job={job} index={index} />
          ))}
        </div>

      </div>

      {/* Decorative stars */}
      <Star className="bottom-10 left-10 opacity-20" />
    </section>
  );
};

export default Experience;
