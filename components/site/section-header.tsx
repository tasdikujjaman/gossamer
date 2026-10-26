import { cn } from '@/lib/utils';

export function SectionHeader({
  label,
  title,
  dark = true,
  className,
}: {
  label: string;
  title: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 md:mb-16', className)}>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            'h-px w-12',
            dark ? 'bg-aqua/40' : 'bg-ink-500/30',
          )}
        />
        <span
          className={cn(
            'mono-label',
            dark ? 'text-muted-slate' : 'text-ink-600/70',
          )}
        >
          {label}
        </span>
      </div>
      <h2
        className={cn(
          'mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl md:text-5xl text-balance',
          dark ? 'text-warm-white' : 'text-ink-900',
        )}
      >
        {title}
      </h2>
    </div>
  );
}
