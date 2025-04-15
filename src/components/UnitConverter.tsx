
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UnitConverterProps = {
  title: string;
  units: Record<string, { name: string; toBase?: number }>;
  convert: (value: number, from: string, to: string) => number;
  formatFunc?: (value: number, category: string) => string;
  iconColor: string;
  icon: React.ReactNode;
  category: string;
  defaultInputValue?: string;
};

export function UnitConverter({
  title,
  units,
  convert,
  formatFunc,
  iconColor,
  icon,
  category,
  defaultInputValue = "",
}: UnitConverterProps) {
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [fromUnit, setFromUnit] = useState(Object.keys(units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(units)[1]);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on initial render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Convert the units whenever the input values change
  useEffect(() => {
    if (inputValue) {
      try {
        const numValue = parseFloat(inputValue);
        if (!isNaN(numValue)) {
          const convertedValue = convert(numValue, fromUnit, toUnit);
          setResult(formatFunc 
            ? formatFunc(convertedValue, category) 
            : convertedValue.toString());
        } else {
          setResult("");
        }
      } catch (e) {
        setResult("Error");
      }
    } else {
      setResult("");
    }
  }, [inputValue, fromUnit, toUnit, convert, formatFunc, category]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Allow only numeric input with decimal points and negative signs
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleFromUnitChange = (value: string) => {
    setFromUnit(value);
    // If the new from unit is the same as the to unit, switch to a different to unit
    if (value === toUnit) {
      const unitsList = Object.keys(units);
      const nextIndex = (unitsList.indexOf(value) + 1) % unitsList.length;
      setToUnit(unitsList[nextIndex]);
    }
  };

  const handleToUnitChange = (value: string) => {
    setToUnit(value);
    // If the new to unit is the same as the from unit, switch to a different from unit
    if (value === fromUnit) {
      const unitsList = Object.keys(units);
      const nextIndex = (unitsList.indexOf(value) + 1) % unitsList.length;
      setFromUnit(unitsList[nextIndex]);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setInputValue("");
    setFromUnit(Object.keys(units)[0]);
    setToUnit(Object.keys(units)[1]);
    setResult("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="converter-card">
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
          onClick={handleReset}
          className="rounded-full hover:bg-muted"
          aria-label="Reset converter"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset</span>
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor={`${category}-input`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Enter value:
          </label>
          <Input
            ref={inputRef}
            id={`${category}-input`}
            type="text"
            placeholder="Enter a value"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">From:</label>
            <Select value={fromUnit} onValueChange={handleFromUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">To:</label>
            <Select value={toUnit} onValueChange={handleToUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(units).map(([key, unit]) => (
                  <SelectItem key={key} value={key}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border bg-muted/50 p-3 mt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm text-muted-foreground">Result:</div>
              <div className="font-medium text-base">
                {result || "—"}
              </div>
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopy}
              disabled={!result}
              className={`h-8 w-8 transition-all duration-300 ${copied ? 'bg-green-500 text-white border-green-500' : ''}`}
              aria-label="Copy result"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy value</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
