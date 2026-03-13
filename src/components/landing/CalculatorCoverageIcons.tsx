type IconProps = {
  className?: string;
};

const iconStroke = "hsl(var(--accent))";
const iconFill = "hsl(var(--accent) / 0.14)";

export function ModelCostIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <rect x="10" y="14" width="44" height="34" rx="8" fill={iconFill} stroke={iconStroke} strokeWidth="2.4" />
      <path d="M20 26H44" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 34H34" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M39 31.5C39 28.46 41.46 26 44.5 26C47.54 26 50 28.46 50 31.5C50 34.54 47.54 37 44.5 37C41.46 37 39 39.46 39 42.5C39 45.54 41.46 48 44.5 48C47.54 48 50 45.54 50 42.5" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44.5 22.5V26" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M44.5 48V51.5" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function HeartbeatBudgetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <circle cx="32" cy="32" r="21" fill={iconFill} stroke={iconStroke} strokeWidth="2.4" />
      <path
        d="M17 33H24L28 25L33 39L37 30H47"
        stroke={iconStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 18V14" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M45 20L47.8 17.2" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function FallbackBehaviourIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <rect x="11" y="15" width="18" height="14" rx="5" fill={iconFill} stroke={iconStroke} strokeWidth="2.4" />
      <rect x="35" y="35" width="18" height="14" rx="5" fill={iconFill} stroke={iconStroke} strokeWidth="2.4" />
      <path
        d="M27 22H40C45.52 22 50 26.48 50 32V35"
        stroke={iconStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M45 31L50 36L55 31" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M37 42H24C18.48 42 14 37.52 14 32V29"
        stroke={iconStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19 33L14 28L9 33" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MultiAgentModeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <circle cx="23" cy="24" r="7" fill={iconFill} stroke={iconStroke} strokeWidth="2.4" />
      <circle cx="42" cy="22" r="6" fill={iconFill} stroke={iconStroke} strokeWidth="2.4" />
      <path
        d="M13 44C13 38.48 17.48 34 23 34C28.52 34 33 38.48 33 44"
        stroke={iconStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M34 45C34 40.58 37.58 37 42 37C46.42 37 50 40.58 50 45"
        stroke={iconStroke}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path d="M32 26L35.5 29.5L42 23" stroke={iconStroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
