'use client';

import { motion, Transition } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface StrokedButtonProps {
  href: string;
  children: ReactNode;

  // Color & typography
  bgClass?: string;            // Tailwind bg‑* class
  textClass?: string;          // Tailwind text‑* class
  strokeColor?: string;        // CSS color for text stroke
  fontSize?: string;           // CSS font‑size (desktop)
  mobileFontSize?: string;     // CSS font‑size (mobile)
  
  // Spacing & shape
  paddingY?: string;           // e.g. 'py-3 sm:py-4'
  paddingX?: string;           // e.g. 'px-6 sm:px-8'
  borderRadius?: string;       // e.g. 'rounded-lg'

  // Animation
  hoverScale?: number;         // scale on hover
  tapScale?: number;           // scale on tap
  transitionDuration?: number; // in milliseconds
  transitionType?: 'tween' | 'spring';

  // Extra
  className?: string;          // any additional Tailwind classes
  styleOverrides?: React.CSSProperties;
}

export default function StrokedButton({
  href,
  children,
  // — Styling defaults —
  bgClass          = 'bg-green-300',
  textClass        = 'text-gray-800',
  strokeColor      = '#000000',
  fontSize         = '1.25rem',  // 20px
  mobileFontSize   = '1rem',     // 16px
  paddingY         = 'py-3 sm:py-4',
  paddingX         = 'px-6 sm:px-8',
  borderRadius     = 'rounded-lg',

  // — Animation defaults —
  hoverScale       = 1.05,
  tapScale         = 0.7,
  transitionDuration = 200,
  transitionType   = 'spring',

  // — Extras —
  className        = '',
  styleOverrides   = {},
}: StrokedButtonProps) {
  // Build the Framer Motion transition object
  const transition: Transition =
    transitionType === 'spring'
      ? { type: 'spring', duration: transitionDuration / 1000 }
      : { type: 'tween', duration: transitionDuration / 1000 };

  // Use motion(Link) to avoid nesting <a> tags
  const MotionLink = motion(Link);

  return (
    <MotionLink
      href={href}
      className={`
        ${bgClass} ${textClass}
        ${paddingY} ${paddingX}
        ${borderRadius}
        font-semibold text-center cursor-pointer
        transition-all
        ${className}
      `}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={transition}
      style={{
        // text stroke
        textShadow: `2px 2px 0 ${strokeColor}`,
        // responsive font sizing
        fontSize,
        // allow user overrides
        ...styleOverrides,
      }}
    >
      <span
        className="block sm:inline"
        style={{ fontSize: mobileFontSize }}
      >
        {children}
      </span>
    </MotionLink>
  );
}
