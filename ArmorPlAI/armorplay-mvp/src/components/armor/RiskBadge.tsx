// ─── ArmorPlay AI · RiskBadge ────────────────────────────────────────
// Semáforo: green = Óptimo | yellow = En riesgo | red = Lesionado

import type { SemaforoColor } from '@/lib/semaforo';
import type { Lang } from '@/lib/i18n';

const map: Record<SemaforoColor, { labelEs: string; labelEn: string; dot: string; bg: string; text: string; ring: string }> = {
  green:  { labelEs: 'Óptimo',    labelEn: 'Optimal', dot: 'bg-risk-low',  bg: 'bg-risk-low/10',  text: 'text-risk-low',  ring: 'ring-risk-low/30'  },
  yellow: { labelEs: 'En riesgo', labelEn: 'At Risk',  dot: 'bg-risk-mid',  bg: 'bg-risk-mid/10',  text: 'text-risk-mid',  ring: 'ring-risk-mid/30'  },
  red:    { labelEs: 'Lesionado', labelEn: 'Injured',  dot: 'bg-risk-high', bg: 'bg-risk-high/10', text: 'text-risk-high', ring: 'ring-risk-high/30' },
};

interface RiskBadgeProps {
  risk: SemaforoColor;
  label?: string;
  lang?: Lang;
  className?: string;
  pulse?: boolean;
}

export function RiskBadge({ risk, label, lang = 'es', className = '', pulse = true }: RiskBadgeProps) {
  const s = map[risk];
  const defaultLabel = lang === 'es' ? s.labelEs : s.labelEn;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${s.bg} ${s.text} ring-1 ${s.ring} px-2.5 py-1 text-xs font-medium ${className}`}
    >
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${s.dot}`}>
        {pulse && (
          <span className={`absolute inset-0 rounded-full ${s.dot} animate-pulse`} />
        )}
      </span>
      {label ?? defaultLabel}
    </span>
  );
}

// ─── Semaphore dot (solo punto de color sin texto) ───────────────────
export function SemaforoDot({ color, size = 'md' }: { color: SemaforoColor; size?: 'sm' | 'md' | 'lg' }) {
  const colorMap = { green: 'bg-risk-low shadow-[0_0_6px_var(--risk-low)]', yellow: 'bg-risk-mid shadow-[0_0_6px_var(--risk-mid)]', red: 'bg-risk-high shadow-[0_0_6px_var(--risk-high)]' };
  const sizeMap  = { sm: 'h-2 w-2', md: 'h-3 w-3', lg: 'h-4 w-4' };
  return <span className={`inline-block rounded-full ${colorMap[color]} ${sizeMap[size]}`} />;
}
