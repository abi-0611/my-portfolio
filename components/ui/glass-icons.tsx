"use client";

import { ReactNode } from "react";
import "@/styles/glass-icons.css";

type GlassIconColor = "blue" | "purple" | "red" | "indigo" | "orange" | "green" | string;

export interface GlassIconItem {
  icon: ReactNode;
  color: GlassIconColor;
  label: string;
  customClass?: string;
  onClick?: () => void;
  href?: string;
}

interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
};

const getBackgroundStyle = (color: GlassIconColor): React.CSSProperties => {
  if (gradientMapping[color]) {
    return { background: gradientMapping[color] };
  }
  return { background: color };
};

const GlassIcons = ({ items, className }: GlassIconsProps) => {
  return (
    <div className={`icon-btns ${className ?? ""}`}>
      {items.map((item, index) => {
        const inner = (
          <>
            <span className="icon-btn__back" style={getBackgroundStyle(item.color)} />
            <span className="icon-btn__front">
              <span className="icon-btn__icon" aria-hidden="true">
                {item.icon}
              </span>
            </span>
            <span className="icon-btn__label">{item.label}</span>
          </>
        );

        if (item.href) {
          return (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`icon-btn ${item.customClass ?? ""}`}
              aria-label={item.label}
            >
              {inner}
            </a>
          );
        }

        return (
          <button
            key={index}
            type="button"
            className={`icon-btn ${item.customClass ?? ""}`}
            aria-label={item.label}
            onClick={item.onClick}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
};

export default GlassIcons;
