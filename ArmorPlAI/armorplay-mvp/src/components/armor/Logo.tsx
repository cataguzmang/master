export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent opacity-90 blur-[6px]" />
        <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-semibold tracking-tight text-sm">ARMOR</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Player AI</span>
      </div>
    </div>
  );
}
