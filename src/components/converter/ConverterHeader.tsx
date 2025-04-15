
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ConverterHeaderProps {
  title: string;
  iconColor: string;
  icon: React.ReactNode;
  onReset: () => void;
}

export function ConverterHeader({
  title,
  iconColor,
  icon,
  onReset
}: ConverterHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div
          className="p-2 rounded-full mr-2"
          style={{ backgroundColor: `${iconColor}25` }}
        >
          <div
            className="text-white rounded-full p-1"
            style={{ backgroundColor: iconColor }}
          >
            {icon}
          </div>
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="rounded-full hover:bg-muted"
        aria-label="Reset converter"
      >
        <RotateCcw className="h-4 w-4" />
        <span className="sr-only">Reset</span>
      </Button>
    </div>
  );
}
