import data from '../lib/site';
import SectionHeader from './ui/SectionHeader';
import { ExternalLinkIcon } from './SocialIcons';

const { achievements, achievementsSection } = data;

const AchievementCard = ({ achievement, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 100}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col gap-4 hover:scale-[1.02] hover:border-red-500/30 hover:shadow-[0_20px_50px_rgba(255,42,42,0.1)] transition-all duration-500"
  >
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/30 text-xs font-mono font-bold tracking-widest">
        {String(index + 1).padStart(2, '0')}
      </span>
      {/* Trophy icon */}
      <svg className="w-7 h-7 text-[#ff2a2a]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    </div>
    <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">{achievement.title}</h3>
    <p className="text-white/70 text-sm md:text-[15px] font-medium leading-relaxed flex-grow">
      {achievement.description}
    </p>
    <a
      href={achievement.link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 self-start text-sm font-bold text-red-300 hover:text-white transition-colors duration-300 group"
    >
      {achievement.link.label}
      <ExternalLinkIcon className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
    </a>
  </div>
);

const Achievements = () => {
  return (
    <section id="achievements" className="bg-[#0a0a0a] min-h-screen flex flex-col justify-center pt-24 pb-24 px-6 md:px-12 w-full relative overflow-hidden font-sans">
      {/* Background visual elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">

        <SectionHeader
          badge={achievementsSection.badge}
          heading={achievementsSection.heading}
          description={achievementsSection.description}
        />

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
