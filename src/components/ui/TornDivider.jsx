// Torn-paper section divider used between the red and dark sections.
const TornDivider = ({ position = 'bottom', fill = 'fill-[#0a0a0a]' }) => (
  <div
    aria-hidden="true"
    className={`absolute left-0 w-full pointer-events-none ${
      position === 'top'
        ? 'top-0 z-10 transform -translate-y-[1px] rotate-180'
        : 'bottom-0 z-30 transform translate-y-1'
    }`}
  >
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-12 md:h-20 ${fill}`}>
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
    </svg>
  </div>
);

export default TornDivider;
