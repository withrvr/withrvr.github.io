// Decorative pulsing star accent used on the red sections.
const Star = ({ className = '', size = 'w-16 h-16', style }) => (
  <div aria-hidden="true" className={`absolute text-black animate-pulse pointer-events-none ${className}`} style={style}>
    <svg className={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
    </svg>
  </div>
);

export default Star;
