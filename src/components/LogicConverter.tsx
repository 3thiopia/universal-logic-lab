
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LogicConverterProps {
  title: string;
  converterFunctions: Record<string, (input: string) => string>;
  inputOptions: Array<{ id: string, label: string }>;
  outputOptions: Array<{ id: string, label: string }>;
  iconColor: string;
  icon: React.ReactNode;
  defaultInputValue?: string;
  defaultInputOption?: string;
  defaultOutputOption?: string;
  placeholder?: string;
  inputValidator?: (value: string) => boolean;
  inputPattern?: string;
}

export function LogicConverter({
  title,
  converterFunctions,
  inputOptions,
  outputOptions,
  iconColor,
  icon,
  defaultInputValue = "",
  defaultInputOption,
  defaultOutputOption,
  placeholder = "Enter value",
  inputValidator,
  inputPattern
}: LogicConverterProps) {
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [fromType, setFromType] = useState(defaultInputOption || inputOptions[0]?.id || "");
  const [toType, setToType] = useState(defaultOutputOption || outputOptions[0]?.id || "");
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

  // Convert the input whenever values change
  useEffect(() => {
    if (inputValue && fromType && toType) {
      try {
        if (inputValidator && !inputValidator(inputValue)) {
          setResult(`Invalid ${fromType} input`);
          return;
        }
        
        // Get the correct converter function key based on fromType and toType
        const convertFunctionKey = `${fromType}To${toType}`;
        
        // Check if the converter function exists
        if (converterFunctions[convertFunctionKey]) {
          const convertedValue = converterFunctions[convertFunctionKey](inputValue);
          setResult(convertedValue);
        } else {
          setResult("Conversion not supported");
          console.log(`Conversion from ${fromType} to ${toType} not supported. Available functions:`, Object.keys(converterFunctions));
        }
      } catch (e) {
        console.error("Conversion error:", e);
        setResult("Error in conversion");
      }
    } else {
      setResult("");
    }
  }, [inputValue, fromType, toType, converterFunctions, inputValidator]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleFromTypeChange = (value: string) => {
    setFromType(value);
    // If the new from type is the same as the to type, switch to a different to type
    if (value === toType) {
      const nextIndex = (outputOptions.findIndex(opt => opt.id === value) + 1) % outputOptions.length;
      setToType(outputOptions[nextIndex].id);
    }
  };

  const handleToTypeChange = (value: string) => {
    setToType(value);
    // If the new to type is the same as the from type, switch to a different from type
    if (value === fromType) {
      const nextIndex = (inputOptions.findIndex(opt => opt.id === value) + 1) % inputOptions.length;
      setFromType(inputOptions[nextIndex].id);
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
    setFromType(inputOptions[0]?.id || "");
    setToType(outputOptions[0]?.id || "");
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
          <label htmlFor={`${title.toLowerCase()}-input`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Enter value:
          </label>
          <Input
            ref={inputRef}
            id={`${title.toLowerCase()}-input`}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            pattern={inputPattern}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">From:</label>
            <Select value={fromType} onValueChange={handleFromTypeChange}>
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
            <Select value={toType} onValueChange={handleToTypeChange}>
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

        <div className="rounded-md border bg-muted/50 p-3 mt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm text-muted-foreground">Result:</div>
              <div className="font-medium text-base break-all">
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
