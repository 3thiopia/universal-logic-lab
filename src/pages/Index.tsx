
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RulerIcon, 
  ScaleIcon, 
  ThermometerIcon,
  GaugeIcon, 
  SquareIcon, 
  FlaskConicalIcon, 
  ClockIcon,
  HardDriveIcon, 
  ZapIcon, 
  BatteryMediumIcon,
  BinaryIcon,
  Sigma,
  FileTextIcon,
  AlignLeftIcon
} from "lucide-react";
import { UnitConverter } from "@/components/UnitConverter";
import { LogicConverter } from "@/components/LogicConverter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AdPlaceholder } from "@/components/AdPlaceholder";

// Import unit converters
import { 
  lengthUnits, 
  weightUnits, 
  temperatureUnits, 
  speedUnits, 
  areaUnits,
  volumeUnits,
  timeUnits,
  digitalUnits,
  energyUnits,
  pressureUnits,
  convertLength,
  convertWeight,
  convertTemperature,
  convertSpeed,
  convertArea,
  convertVolume,
  convertTime,
  convertDigital,
  convertEnergy,
  convertPressure,
  formatConversion
} from '@/utils/unitConverters';

// Import logic converters
import {
  convertBinary,
  convertDecimal,
  convertHex,
  convertOctal,
  romanNumerals,
  morseCode,
  braille
} from '@/utils/logicConverters';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("units");

  // Constructing the logic converter functions
  const numericConverterFunctions = {
    binaryToDecimal: convertBinary.toDecimal,
    binaryToHex: convertBinary.toHex,
    binaryToOctal: convertBinary.toOctal,
    
    decimalToBinary: convertDecimal.toBinary,
    decimalToHex: convertDecimal.toHex,
    decimalToOctal: convertDecimal.toOctal,
    
    hexToBinary: convertHex.toBinary,
    hexToDecimal: convertHex.toDecimal,
    hexToOctal: convertHex.toOctal,
    
    octalToBinary: convertOctal.toBinary,
    octalToDecimal: convertOctal.toDecimal,
    octalToHex: convertOctal.toHex
  };

  const numericOptions = [
    { id: 'binary', label: 'Binary' },
    { id: 'decimal', label: 'Decimal' },
    { id: 'hex', label: 'Hexadecimal' },
    { id: 'octal', label: 'Octal' }
  ];

  // Fix the roman numeral converter functions
  const romanConverterFunctions = {
    arabicToRoman: (input: string) => {
      const num = parseInt(input, 10);
      if (isNaN(num)) return 'Invalid number';
      return romanNumerals.toRoman(num);
    },
    romanToArabic: (input: string) => {
      return romanNumerals.fromRoman(input);
    }
  };

  // Fix the morse code converter functions
  const morseConverterFunctions = {
    textToMorse: (input: string) => morseCode.toMorse(input),
    morseToText: (input: string) => morseCode.fromMorse(input)
  };

  // Fix the braille converter functions
  const brailleConverterFunctions = {
    textToBraille: (input: string) => braille.toBraille(input),
    brailleToText: (input: string) => braille.fromBraille(input)
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Sigma className="text-primary-foreground h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Universal Logic Lab</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        {/* Top Ad */}
        <AdPlaceholder variant="leaderboard" className="mb-6" />
        
        <h1 className="text-3xl font-bold tracking-tight mb-2">All-in-One Converter</h1>
        <p className="text-muted-foreground mb-6">
          Convert between different units and number systems quickly and easily. No internet connection required.
        </p>
        
        <Tabs defaultValue="units" className="mb-8" onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="units">Unit Converters</TabsTrigger>
            <TabsTrigger value="logic">Logic Converters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="units" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UnitConverter
                title="Length"
                units={lengthUnits}
                convert={convertLength}
                formatFunc={formatConversion}
                iconColor="#3b82f6"
                icon={<RulerIcon className="h-4 w-4" />}
                category="length"
              />
              
              <UnitConverter
                title="Weight / Mass"
                units={weightUnits}
                convert={convertWeight}
                formatFunc={formatConversion}
                iconColor="#10b981"
                icon={<ScaleIcon className="h-4 w-4" />}
                category="weight"
              />
            </div>
            
            {/* Middle Ad */}
            <AdPlaceholder variant="rectangle" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UnitConverter
                title="Temperature"
                units={temperatureUnits}
                convert={convertTemperature}
                formatFunc={formatConversion}
                iconColor="#ef4444"
                icon={<ThermometerIcon className="h-4 w-4" />}
                category="temperature"
              />
              
              <UnitConverter
                title="Speed"
                units={speedUnits}
                convert={convertSpeed}
                formatFunc={formatConversion}
                iconColor="#f59e0b"
                icon={<GaugeIcon className="h-4 w-4" />}
                category="speed"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UnitConverter
                title="Area"
                units={areaUnits}
                convert={convertArea}
                formatFunc={formatConversion}
                iconColor="#8b5cf6"
                icon={<SquareIcon className="h-4 w-4" />}
                category="area"
              />
              
              <UnitConverter
                title="Volume"
                units={volumeUnits}
                convert={convertVolume}
                formatFunc={formatConversion}
                iconColor="#0ea5e9"
                icon={<FlaskConicalIcon className="h-4 w-4" />}
                category="volume"
              />
            </div>
            
            {/* Middle Ad */}
            <AdPlaceholder variant="rectangle" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UnitConverter
                title="Time"
                units={timeUnits}
                convert={convertTime}
                formatFunc={formatConversion}
                iconColor="#6366f1"
                icon={<ClockIcon className="h-4 w-4" />}
                category="time"
              />
              
              <UnitConverter
                title="Digital Storage"
                units={digitalUnits}
                convert={convertDigital}
                formatFunc={formatConversion}
                iconColor="#64748b"
                icon={<HardDriveIcon className="h-4 w-4" />}
                category="digital"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UnitConverter
                title="Energy"
                units={energyUnits}
                convert={convertEnergy}
                formatFunc={formatConversion}
                iconColor="#ec4899"
                icon={<ZapIcon className="h-4 w-4" />}
                category="energy"
              />
              
              <UnitConverter
                title="Pressure"
                units={pressureUnits}
                convert={convertPressure}
                formatFunc={formatConversion}
                iconColor="#0d9488"
                icon={<BatteryMediumIcon className="h-4 w-4" />}
                category="pressure"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="logic" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LogicConverter
                title="Number Systems"
                converterFunctions={numericConverterFunctions}
                inputOptions={numericOptions}
                outputOptions={numericOptions}
                iconColor="#059669"
                icon={<BinaryIcon className="h-4 w-4" />}
                placeholder="Enter value"
              />
              
              <LogicConverter
                title="Roman Numerals"
                converterFunctions={romanConverterFunctions}
                inputOptions={[
                  { id: 'arabic', label: 'Arabic Number' },
                  { id: 'roman', label: 'Roman Numeral' }
                ]}
                outputOptions={[
                  { id: 'roman', label: 'Roman Numeral' },
                  { id: 'arabic', label: 'Arabic Number' }
                ]}
                iconColor="#b45309"
                icon={<Sigma className="h-4 w-4" />}
                placeholder="Enter number or numeral"
              />
            </div>
            
            {/* Middle Ad */}
            <AdPlaceholder variant="rectangle" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LogicConverter
                title="Morse Code"
                converterFunctions={morseConverterFunctions}
                inputOptions={[
                  { id: 'text', label: 'Text' },
                  { id: 'morse', label: 'Morse Code' }
                ]}
                outputOptions={[
                  { id: 'morse', label: 'Morse Code' },
                  { id: 'text', label: 'Text' }
                ]}
                iconColor="#1d4ed8"
                icon={<FileTextIcon className="h-4 w-4" />}
                placeholder="Enter text or morse code"
              />
              
              <LogicConverter
                title="Braille"
                converterFunctions={brailleConverterFunctions}
                inputOptions={[
                  { id: 'text', label: 'Text' },
                  { id: 'braille', label: 'Braille' }
                ]}
                outputOptions={[
                  { id: 'braille', label: 'Braille' },
                  { id: 'text', label: 'Text' }
                ]}
                iconColor="#7c3aed"
                icon={<AlignLeftIcon className="h-4 w-4" />}
                placeholder="Enter text or braille symbols"
              />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Bottom Ad */}
        <AdPlaceholder variant="footer" className="mt-8" />
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Universal Logic Lab. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript, and TailwindCSS. No APIs or internet connection required.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
