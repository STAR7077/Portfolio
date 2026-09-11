import type { ReactNode, SVGProps } from "react";

/**
 * The site's interface icons: one stroke weight, one corner treatment, drawn
 * on a 24px grid and shown small. Kept in one file so a new component reuses
 * these instead of sketching its own and drifting from the rest.
 */

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Svg({ size = 16, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconSpark = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10.5 3 12.3 7.7 17 9.5l-4.7 1.8L10.5 16l-1.8-4.7L4 9.5l4.7-1.8L10.5 3Z" />
    <path d="M17.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12.5 4.2 4.2L19 7" />
  </Svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const IconChat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20.5 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.7A8 8 0 1 1 20.5 12Z" />
  </Svg>
);

export const IconDatabase = (p: IconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="5.8" rx="7" ry="2.8" />
    <path d="M5 5.8v12.4c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V5.8M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
  </Svg>
);

export const IconPlug = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 3v4M15 3v4M7 7h10v4a5 5 0 0 1-10 0V7ZM12 16v5" />
  </Svg>
);

export const IconBolt = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13 2.5 4.5 14h6l-1 7.5L18.5 10h-6l.5-7.5Z" />
  </Svg>
);

export const IconUsers = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19v-.8A4.2 4.2 0 0 1 7.7 14h2.6a4.2 4.2 0 0 1 4.2 4.2v.8M16 4.8a3.2 3.2 0 0 1 0 6.4M17.5 14a4.2 4.2 0 0 1 3 4v1" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const IconWrench = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.7 6.3a4 4 0 0 1-5.2 5.2l-5 5a1.8 1.8 0 1 0 2.5 2.5l5-5a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.1-2.1 2-2.8Z" />
  </Svg>
);

export const IconTrend = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 17 9.5 11l4 4 7-7.5M15 7.5h5.5V13" />
  </Svg>
);

export const IconCode = (p: IconProps) => (
  <Svg {...p}>
    <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4" />
  </Svg>
);
