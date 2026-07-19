// Tag pill used for skills and project tech stacks.
const sizes = {
  sm: 'px-3 py-1 text-xs text-white/70',
  md: 'px-3 py-1.5 text-xs md:text-sm text-white/80',
};

const Chip = ({ children, size = 'sm' }) => (
  <span
    className={`${sizes[size]} font-bold bg-white/5 rounded-full border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-300 transition-all duration-300 cursor-default`}
  >
    {children}
  </span>
);

export default Chip;
