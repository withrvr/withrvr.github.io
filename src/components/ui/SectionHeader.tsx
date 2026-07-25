interface SectionHeaderProps {
  index: string;
  label: string;
}

// Numbered section label with a trailing rule, reused by every section.
export default function SectionHeader({ index, label }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
        {index}. {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
