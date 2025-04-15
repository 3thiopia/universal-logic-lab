
import { ChangeEvent, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConverterControlsProps {
  inputValue: string;
  fromType: string;
  toType: string;
  inputOptions: Array<{ id: string, label: string }>;
  outputOptions: Array<{ id: string, label: string }>;
  placeholder?: string;
  inputPattern?: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFromTypeChange: (value: string) => void;
  onToTypeChange: (value: string) => void;
}

export function ConverterControls({
  inputValue,
  fromType,
  toType,
  inputOptions,
  outputOptions,
  placeholder = "Enter value",
  inputPattern,
  onInputChange,
  onFromTypeChange,
  onToTypeChange,
}: ConverterControlsProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input on initial render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <label htmlFor="converter-input" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Enter value:
        </label>
        <Input
          ref={inputRef}
          id="converter-input"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={onInputChange}
          pattern={inputPattern}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">From:</label>
          <Select value={fromType} onValueChange={onFromTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {inputOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">To:</label>
          <Select value={toType} onValueChange={onToTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {outputOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
