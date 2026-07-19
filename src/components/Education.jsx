import data from '../lib/site';

const { education, educationSection } = data;

const EducationCard = ({ entry, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 150}
    className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-all duration-500 flex flex-col gap-3"
  >
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-400 text-xs font-mono font-bold tracking-widest uppercase">
        {entry.duration}
      </span>
      {/* Graduation cap icon */}
      <svg className="w-8 h-8 text-[#ff2a2a]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-7 9.18v4L12 20l7-3.82v-4L12 16l-7-3.82z" />
      </svg>
    </div>
    <h3 className="text-gray-900 text-2xl font-black tracking-tight">{entry.institution}</h3>
    <p className="text-gray-600 text-base font-semibold">{entry.degree}</p>
    <p className="text-gray-400 text-sm font-medium">{entry.location}</p>
  </div>
);

const Education = () => {
  return (
    <section
      id="education"
      className="bg-white pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-6 shadow-sm bg-white">
            Academics
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">
            {educationSection.heading}
          </h2>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {education.map((entry, index) => (
            <EducationCard key={entry.institution} entry={entry} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
