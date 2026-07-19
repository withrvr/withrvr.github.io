// Badge pill + heading + description block that opens most sections.
const tones = {
  dark: {
    badge: 'border border-white/20 text-white/60 bg-white/5 backdrop-blur-sm',
    heading: 'text-white',
    description: 'text-white/50',
  },
  light: {
    badge: 'border border-gray-300 text-gray-600 bg-white',
    heading: 'text-gray-900',
    description: 'text-gray-500',
  },
};

const SectionHeader = ({
  badge,
  heading,
  description,
  tone = 'dark',
  align = 'center',
  uppercase = true,
  size = 'md',
  className = 'mb-16',
}) => {
  const t = tones[tone];
  const centered = align === 'center';
  return (
    <div data-aos="fade-up" className={`${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <div className={`inline-block rounded-full px-5 py-1.5 text-sm font-bold mb-6 shadow-sm ${t.badge}`}>
          {badge}
        </div>
      )}
      <h2
        className={`font-black tracking-tight mb-4 ${t.heading} ${uppercase ? 'uppercase' : ''} ${
          size === 'lg' ? 'text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6' : 'text-4xl md:text-5xl'
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p className={`text-base md:text-lg font-medium leading-relaxed ${t.description} ${centered ? 'max-w-xl mx-auto' : 'max-w-lg'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
