import { useState, useEffect } from "react";
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
import { SearchBar } from "@/components/SearchBar";
import { useToast } from "@/hooks/use-toast";

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

// Define search result interface
interface SearchResult {
  title: string;
  category: string;
  tabId: string;
  type: "unit" | "logic";
  description?: string;
}

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("units");
  const [searchItems, setSearchItems] = useState<SearchResult[]>([]);
  const { toast } = useToast();

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

  // Initialize search items on component mount
  useEffect(() => {
    const unitConverters: SearchResult[] = [
      {
        title: "Length",
        category: "length",
        tabId: "units",
        type: "unit",
        description: "Convert between meters, feet, inches, and more"
      },
      {
        title: "Weight / Mass",
        category: "weight",
        tabId: "units",
        type: "unit",
        description: "Convert between kg, pounds, ounces, and more"
      },
      {
        title: "Temperature",
        category: "temperature",
        tabId: "units",
        type: "unit",
        description: "Convert between celsius, fahrenheit, and kelvin"
      },
      {
        title: "Speed",
        category: "speed",
        tabId: "units",
        type: "unit",
        description: "Convert between mph, km/h, and more"
      },
      {
        title: "Area",
        category: "area",
        tabId: "units",
        type: "unit",
        description: "Convert between square meters, acres, and more"
      },
      {
        title: "Volume",
        category: "volume",
        tabId: "units",
        type: "unit",
        description: "Convert between liters, gallons, and more"
      },
      {
        title: "Time",
        category: "time",
        tabId: "units",
        type: "unit",
        description: "Convert between seconds, minutes, hours, and more"
      },
      {
        title: "Digital Storage",
        category: "digital",
        tabId: "units",
        type: "unit",
        description: "Convert between bytes, kilobytes, gigabytes, and more"
      },
      {
        title: "Energy",
        category: "energy",
        tabId: "units",
        type: "unit",
        description: "Convert between joules, calories, kWh, and more"
      },
      {
        title: "Pressure",
        category: "pressure",
        tabId: "units",
        type: "unit",
        description: "Convert between pascal, bar, psi, and more"
      }
    ];

    const logicConverters: SearchResult[] = [
      {
        title: "Number Systems",
        category: "numeric",
        tabId: "logic",
        type: "logic",
        description: "Convert between binary, decimal, hexadecimal, and octal"
      },
      {
        title: "Roman Numerals",
        category: "roman",
        tabId: "logic",
        type: "logic",
        description: "Convert between roman numerals and arabic numbers"
      },
      {
        title: "Morse Code",
        category: "morse",
        tabId: "logic",
        type: "logic",
        description: "Convert between text and morse code"
      },
      {
        title: "Braille",
        category: "braille",
        tabId: "logic",
        type: "logic",
        description: "Convert between text and braille symbols"
      }
    ];

    setSearchItems([...unitConverters, ...logicConverters]);
  }, []);

  // Handle search result selection
  const handleSearchSelect = (item: SearchResult) => {
    // Change the active tab if needed
    if (activeCategory !== item.tabId) {
      setActiveCategory(item.tabId);
    }
    
    // Scroll to the converter
    setTimeout(() => {
      const element = document.getElementById(item.category);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the element briefly
        element.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
        }, 2000);
      }
      
      toast({
        title: `Found: ${item.title}`,
        description: `Showing the ${item.title.toLowerCase()} converter`,
        duration: 3000,
      });
    }, 100);
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
          
          {/* Add search bar in header */}
          <div className="flex-1 mx-10 max-w-md hidden md:block">
            <SearchBar 
              allItems={searchItems} 
              onSelect={handleSearchSelect}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        {/* Display search bar on mobile */}
        <div className="md:hidden mb-4">
          <SearchBar 
            allItems={searchItems} 
            onSelect={handleSearchSelect}
          />
        </div>
        
        {/* Top Ad */}
        <AdPlaceholder variant="leaderboard" className="mb-6" />
        
        <h1 className="text-3xl font-bold tracking-tight mb-2">All-in-One Converter</h1>
        <p className="text-muted-foreground mb-6">
          Convert between different units and number systems quickly and easily. No internet connection required.
        </p>
        
        <Tabs defaultValue="units" className="mb-8" onValueChange={setActiveCategory} value={activeCategory}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="units">Unit Converters</TabsTrigger>
            <TabsTrigger value="logic">Logic Converters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="units" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="length">
                <UnitConverter
                  title="Length"
                  units={lengthUnits}
                  convert={convertLength}
                  formatFunc={formatConversion}
                  iconColor="#3b82f6"
                  icon={<RulerIcon className="h-4 w-4" />}
                  category="length"
                />
              </div>
              
              <div id="weight">
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
            </div>
            
            {/* Middle Ad */}
            <AdPlaceholder variant="rectangle" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="temperature">
                <UnitConverter
                  title="Temperature"
                  units={temperatureUnits}
                  convert={convertTemperature}
                  formatFunc={formatConversion}
                  iconColor="#ef4444"
                  icon={<ThermometerIcon className="h-4 w-4" />}
                  category="temperature"
                />
              </div>
              
              <div id="speed">
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="area">
                <UnitConverter
                  title="Area"
                  units={areaUnits}
                  convert={convertArea}
                  formatFunc={formatConversion}
                  iconColor="#8b5cf6"
                  icon={<SquareIcon className="h-4 w-4" />}
                  category="area"
                />
              </div>
              
              <div id="volume">
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
            </div>
            
            {/* Middle Ad */}
            <AdPlaceholder variant="rectangle" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="time">
                <UnitConverter
                  title="Time"
                  units={timeUnits}
                  convert={convertTime}
                  formatFunc={formatConversion}
                  iconColor="#6366f1"
                  icon={<ClockIcon className="h-4 w-4" />}
                  category="time"
                />
              </div>
              
              <div id="digital">
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="energy">
                <UnitConverter
                  title="Energy"
                  units={energyUnits}
                  convert={convertEnergy}
                  formatFunc={formatConversion}
                  iconColor="#ec4899"
                  icon={<ZapIcon className="h-4 w-4" />}
                  category="energy"
                />
              </div>
              
              <div id="pressure">
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
            </div>
          </TabsContent>
          
          <TabsContent value="logic" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="numeric">
                <LogicConverter
                  title="Number Systems"
                  converterFunctions={numericConverterFunctions}
                  inputOptions={numericOptions}
                  outputOptions={numericOptions}
                  iconColor="#059669"
                  icon={<BinaryIcon className="h-4 w-4" />}
                  placeholder="Enter value"
                />
              </div>
              
              <div id="roman">
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
            </div>
            
            {/* Middle Ad */}
            <AdPlaceholder variant="rectangle" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="morse">
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
              </div>
              
              <div id="braille">
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
