
import React from "react";

interface AdPlaceholderProps {
  variant: "leaderboard" | "square" | "rectangle" | "footer";
  className?: string;
}

export function AdPlaceholder({ variant, className = "" }: AdPlaceholderProps) {
  let height: string;
  let width: string;
  let label: string;

  switch (variant) {
    case "leaderboard":
      height = "h-24";
      width = "w-full";
      label = "ADVERTISEMENT • LEADERBOARD";
      break;
    case "square":
      height = "h-64";
      width = "w-64";
      label = "ADVERTISEMENT • SQUARE";
      break;
    case "rectangle":
      height = "h-60";
      width = "w-full";
      label = "ADVERTISEMENT • RECTANGLE";
      break;
    case "footer":
      height = "h-24";
      width = "w-full";
      label = "ADVERTISEMENT • FOOTER";
      break;
    default:
      height = "h-24";
      width = "w-full";
      label = "ADVERTISEMENT";
  }

  return (
    <div className={`ad-container ${width} ${height} ${className}`}>
      <span className="ad-label">{label}</span>
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-muted-foreground text-sm animate-pulse-subtle">
          Ad Space
        </div>
      </div>
    </div>
  );
}
