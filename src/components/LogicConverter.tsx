
import { useState, ChangeEvent, useEffect } from "react";
import { ConverterHeader } from "./converter/ConverterHeader";
import { ConverterControls } from "./converter/ConverterControls";
import { ConverterResult } from "./converter/ConverterResult";

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

  // Convert the input whenever values change
  useEffect(() => {
    if (inputValue && fromType && toType) {
      try {
        if (inputValidator && !inputValidator(inputValue)) {
          setResult(`Invalid ${fromType} input`);
          return;
        }
        
        // Fix: First try the exact conversion function key
        const exactKey = `${fromType}To${toType}`;
        
        // Then try other naming conventions that might be used
        const capitalizedFrom = fromType.charAt(0).toUpperCase() + fromType.slice(1);
        const capitalizedTo = toType.charAt(0).toUpperCase() + toType.slice(1);
        const alternativeKey1 = `${fromType}To${capitalizedTo}`;
        const alternativeKey2 = `${capitalizedFrom}To${toType}`;
        const alternativeKey3 = `${capitalizedFrom}To${capitalizedTo}`;
        
        // For Roman numerals and other special converters
        const specialKey1 = `${fromType}To${toType.charAt(0).toUpperCase() + toType.slice(1)}`;
        const specialKey2 = `${fromType}_to_${toType}`;
        
        // Attempt to get the correct conversion function
        const keys = [exactKey, alternativeKey1, alternativeKey2, alternativeKey3, specialKey1, specialKey2];
        let conversionFunction = null;
        
        for (const key of keys) {
          if (converterFunctions[key]) {
            conversionFunction = converterFunctions[key];
            break;
          }
        }
        
        if (conversionFunction) {
          const convertedValue = conversionFunction(inputValue);
          setResult(convertedValue);
        } else {
          // If no conversion function is found, try alternative approach
          // This is for special cases like "text" to "braille" using textToBraille
          const directKey = `${fromType}${toType.charAt(0).toUpperCase() + toType.slice(1)}`;
          
          if (converterFunctions[directKey]) {
            const convertedValue = converterFunctions[directKey](inputValue);
            setResult(convertedValue);
          } else {
            console.log(`Conversion from ${fromType} to ${toType} not supported. Available functions:`, Object.keys(converterFunctions));
            setResult("Conversion not supported");
          }
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

  const handleReset = () => {
    setInputValue("");
    setFromType(inputOptions[0]?.id || "");
    setToType(outputOptions[0]?.id || "");
    setResult("");
  };

  return (
    <div className="converter-card">
      <ConverterHeader 
        title={title}
        iconColor={iconColor}
        icon={icon}
        onReset={handleReset}
      />

      <ConverterControls
        inputValue={inputValue}
        fromType={fromType}
        toType={toType}
        inputOptions={inputOptions}
        outputOptions={outputOptions}
        placeholder={placeholder}
        inputPattern={inputPattern}
        onInputChange={handleInputChange}
        onFromTypeChange={handleFromTypeChange}
        onToTypeChange={handleToTypeChange}
      />

      <ConverterResult result={result} />
    </div>
  );
}
