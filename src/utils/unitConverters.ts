
// Unit Converter Utilities
// These functions handle the unit conversion logic for each category

// Length Converter
export type LengthUnit = 'meter' | 'kilometer' | 'centimeter' | 'millimeter' | 'inch' | 'foot' | 'yard' | 'mile' | 'nauticalMile';

export const lengthUnits: Record<LengthUnit, { name: string, toBase: number }> = {
  meter: { name: 'Meters (m)', toBase: 1 },
  kilometer: { name: 'Kilometers (km)', toBase: 1000 },
  centimeter: { name: 'Centimeters (cm)', toBase: 0.01 },
  millimeter: { name: 'Millimeters (mm)', toBase: 0.001 },
  inch: { name: 'Inches (in)', toBase: 0.0254 },
  foot: { name: 'Feet (ft)', toBase: 0.3048 },
  yard: { name: 'Yards (yd)', toBase: 0.9144 },
  mile: { name: 'Miles (mi)', toBase: 1609.344 },
  nauticalMile: { name: 'Nautical Miles (nmi)', toBase: 1852 }
};

export const convertLength = (value: number, from: LengthUnit, to: LengthUnit): number => {
  const baseValue = value * lengthUnits[from].toBase;
  return baseValue / lengthUnits[to].toBase;
};

// Weight / Mass Converter
export type WeightUnit = 'kilogram' | 'gram' | 'milligram' | 'metricTon' | 'pound' | 'ounce' | 'stone' | 'usTon' | 'imperialTon';

export const weightUnits: Record<WeightUnit, { name: string, toBase: number }> = {
  kilogram: { name: 'Kilograms (kg)', toBase: 1 },
  gram: { name: 'Grams (g)', toBase: 0.001 },
  milligram: { name: 'Milligrams (mg)', toBase: 0.000001 },
  metricTon: { name: 'Metric Tons (t)', toBase: 1000 },
  pound: { name: 'Pounds (lb)', toBase: 0.45359237 },
  ounce: { name: 'Ounces (oz)', toBase: 0.028349523125 },
  stone: { name: 'Stone (st)', toBase: 6.35029318 },
  usTon: { name: 'US Tons (US t)', toBase: 907.18474 },
  imperialTon: { name: 'Imperial Tons (UK t)', toBase: 1016.0469088 }
};

export const convertWeight = (value: number, from: WeightUnit, to: WeightUnit): number => {
  const baseValue = value * weightUnits[from].toBase;
  return baseValue / weightUnits[to].toBase;
};

// Temperature Converter
export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export const temperatureUnits: Record<TemperatureUnit, { name: string }> = {
  celsius: { name: 'Celsius (°C)' },
  fahrenheit: { name: 'Fahrenheit (°F)' },
  kelvin: { name: 'Kelvin (K)' }
};

export const convertTemperature = (value: number, from: TemperatureUnit, to: TemperatureUnit): number => {
  // First convert to Celsius as our base unit
  let celsius: number;
  
  switch (from) {
    case 'celsius':
      celsius = value;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * (5/9);
      break;
    case 'kelvin':
      celsius = value - 273.15;
      break;
  }
  
  // Then convert from Celsius to target unit
  switch (to) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return (celsius * (9/5)) + 32;
    case 'kelvin':
      return celsius + 273.15;
  }
};

// Speed Converter
export type SpeedUnit = 'metersPerSecond' | 'kilometersPerHour' | 'milesPerHour' | 'knots' | 'feetPerSecond';

export const speedUnits: Record<SpeedUnit, { name: string, toBase: number }> = {
  metersPerSecond: { name: 'Meters per Second (m/s)', toBase: 1 },
  kilometersPerHour: { name: 'Kilometers per Hour (km/h)', toBase: 0.277778 },
  milesPerHour: { name: 'Miles per Hour (mph)', toBase: 0.44704 },
  knots: { name: 'Knots (kn)', toBase: 0.514444 },
  feetPerSecond: { name: 'Feet per Second (ft/s)', toBase: 0.3048 }
};

export const convertSpeed = (value: number, from: SpeedUnit, to: SpeedUnit): number => {
  const baseValue = value * speedUnits[from].toBase;
  return baseValue / speedUnits[to].toBase;
};

// Area Converter
export type AreaUnit = 'squareMeter' | 'squareKilometer' | 'squareCentimeter' | 'squareMillimeter' | 'squareInch' | 'squareFoot' | 'squareYard' | 'squareMile' | 'acre' | 'hectare';

export const areaUnits: Record<AreaUnit, { name: string, toBase: number }> = {
  squareMeter: { name: 'Square Meters (m²)', toBase: 1 },
  squareKilometer: { name: 'Square Kilometers (km²)', toBase: 1000000 },
  squareCentimeter: { name: 'Square Centimeters (cm²)', toBase: 0.0001 },
  squareMillimeter: { name: 'Square Millimeters (mm²)', toBase: 0.000001 },
  squareInch: { name: 'Square Inches (in²)', toBase: 0.00064516 },
  squareFoot: { name: 'Square Feet (ft²)', toBase: 0.09290304 },
  squareYard: { name: 'Square Yards (yd²)', toBase: 0.83612736 },
  squareMile: { name: 'Square Miles (mi²)', toBase: 2589988.11 },
  acre: { name: 'Acres (ac)', toBase: 4046.8564224 },
  hectare: { name: 'Hectares (ha)', toBase: 10000 }
};

export const convertArea = (value: number, from: AreaUnit, to: AreaUnit): number => {
  const baseValue = value * areaUnits[from].toBase;
  return baseValue / areaUnits[to].toBase;
};

// Volume Converter
export type VolumeUnit = 'cubicMeter' | 'liter' | 'milliliter' | 'cubicInch' | 'cubicFoot' | 'cubicYard' | 'usGallon' | 'usQuart' | 'usPint' | 'usFluidOunce' | 'imperialGallon';

export const volumeUnits: Record<VolumeUnit, { name: string, toBase: number }> = {
  cubicMeter: { name: 'Cubic Meters (m³)', toBase: 1 },
  liter: { name: 'Liters (L)', toBase: 0.001 },
  milliliter: { name: 'Milliliters (mL)', toBase: 0.000001 },
  cubicInch: { name: 'Cubic Inches (in³)', toBase: 0.0000163871 },
  cubicFoot: { name: 'Cubic Feet (ft³)', toBase: 0.0283168 },
  cubicYard: { name: 'Cubic Yards (yd³)', toBase: 0.764555 },
  usGallon: { name: 'US Gallons (US gal)', toBase: 0.00378541 },
  usQuart: { name: 'US Quarts (US qt)', toBase: 0.000946353 },
  usPint: { name: 'US Pints (US pt)', toBase: 0.000473176 },
  usFluidOunce: { name: 'US Fluid Ounces (US fl oz)', toBase: 0.0000295735 },
  imperialGallon: { name: 'Imperial Gallons (UK gal)', toBase: 0.00454609 }
};

export const convertVolume = (value: number, from: VolumeUnit, to: VolumeUnit): number => {
  const baseValue = value * volumeUnits[from].toBase;
  return baseValue / volumeUnits[to].toBase;
};

// Time Converter
export type TimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year' | 'millisecond' | 'microsecond' | 'nanosecond';

export const timeUnits: Record<TimeUnit, { name: string, toBase: number }> = {
  second: { name: 'Seconds (s)', toBase: 1 },
  minute: { name: 'Minutes (min)', toBase: 60 },
  hour: { name: 'Hours (h)', toBase: 3600 },
  day: { name: 'Days (d)', toBase: 86400 },
  week: { name: 'Weeks (wk)', toBase: 604800 },
  month: { name: 'Months (avg)', toBase: 2628000 }, // Average month (30.44 days)
  year: { name: 'Years (yr)', toBase: 31536000 }, // Non-leap year
  millisecond: { name: 'Milliseconds (ms)', toBase: 0.001 },
  microsecond: { name: 'Microseconds (μs)', toBase: 0.000001 },
  nanosecond: { name: 'Nanoseconds (ns)', toBase: 0.000000001 }
};

export const convertTime = (value: number, from: TimeUnit, to: TimeUnit): number => {
  const baseValue = value * timeUnits[from].toBase;
  return baseValue / timeUnits[to].toBase;
};

// Digital Storage Converter
export type DigitalUnit = 'bit' | 'byte' | 'kilobyte' | 'megabyte' | 'gigabyte' | 'terabyte' | 'petabyte' | 'kibibyte' | 'mebibyte' | 'gibibyte' | 'tebibyte' | 'pebibyte';

export const digitalUnits: Record<DigitalUnit, { name: string, toBase: number }> = {
  bit: { name: 'Bits (b)', toBase: 0.125 },
  byte: { name: 'Bytes (B)', toBase: 1 },
  kilobyte: { name: 'Kilobytes (KB)', toBase: 1000 },
  megabyte: { name: 'Megabytes (MB)', toBase: 1000000 },
  gigabyte: { name: 'Gigabytes (GB)', toBase: 1000000000 },
  terabyte: { name: 'Terabytes (TB)', toBase: 1000000000000 },
  petabyte: { name: 'Petabytes (PB)', toBase: 1000000000000000 },
  kibibyte: { name: 'Kibibytes (KiB)', toBase: 1024 },
  mebibyte: { name: 'Mebibytes (MiB)', toBase: 1048576 },
  gibibyte: { name: 'Gibibytes (GiB)', toBase: 1073741824 },
  tebibyte: { name: 'Tebibytes (TiB)', toBase: 1099511627776 },
  pebibyte: { name: 'Pebibytes (PiB)', toBase: 1125899906842624 }
};

export const convertDigital = (value: number, from: DigitalUnit, to: DigitalUnit): number => {
  const baseValue = value * digitalUnits[from].toBase;
  return baseValue / digitalUnits[to].toBase;
};

// Energy Converter
export type EnergyUnit = 'joule' | 'kilojoule' | 'calorie' | 'kilocalorie' | 'wattHour' | 'kilowattHour' | 'electronvolt' | 'britishThermalUnit' | 'usTherm' | 'footPound';

export const energyUnits: Record<EnergyUnit, { name: string, toBase: number }> = {
  joule: { name: 'Joules (J)', toBase: 1 },
  kilojoule: { name: 'Kilojoules (kJ)', toBase: 1000 },
  calorie: { name: 'Calories (cal)', toBase: 4.184 },
  kilocalorie: { name: 'Kilocalories (kcal)', toBase: 4184 },
  wattHour: { name: 'Watt-hours (Wh)', toBase: 3600 },
  kilowattHour: { name: 'Kilowatt-hours (kWh)', toBase: 3600000 },
  electronvolt: { name: 'Electronvolts (eV)', toBase: 1.602176634e-19 },
  britishThermalUnit: { name: 'British Thermal Units (BTU)', toBase: 1055.06 },
  usTherm: { name: 'US Therms', toBase: 105506000 },
  footPound: { name: 'Foot-pounds (ft⋅lb)', toBase: 1.355818 }
};

export const convertEnergy = (value: number, from: EnergyUnit, to: EnergyUnit): number => {
  const baseValue = value * energyUnits[from].toBase;
  return baseValue / energyUnits[to].toBase;
};

// Pressure Converter
export type PressureUnit = 'pascal' | 'kilopascal' | 'megapascal' | 'bar' | 'psi' | 'atmosphere' | 'torr' | 'millimeterMercury' | 'inchMercury';

export const pressureUnits: Record<PressureUnit, { name: string, toBase: number }> = {
  pascal: { name: 'Pascals (Pa)', toBase: 1 },
  kilopascal: { name: 'Kilopascals (kPa)', toBase: 1000 },
  megapascal: { name: 'Megapascals (MPa)', toBase: 1000000 },
  bar: { name: 'Bars', toBase: 100000 },
  psi: { name: 'Pounds per Square Inch (psi)', toBase: 6894.76 },
  atmosphere: { name: 'Atmospheres (atm)', toBase: 101325 },
  torr: { name: 'Torr', toBase: 133.322 },
  millimeterMercury: { name: 'Millimeters of Mercury (mmHg)', toBase: 133.322 },
  inchMercury: { name: 'Inches of Mercury (inHg)', toBase: 3386.39 }
};

export const convertPressure = (value: number, from: PressureUnit, to: PressureUnit): number => {
  const baseValue = value * pressureUnits[from].toBase;
  return baseValue / pressureUnits[to].toBase;
};

// Format the output according to unit type and value
export const formatConversion = (value: number, category: string): string => {
  if (value === 0) return '0';
  
  if (Math.abs(value) < 0.000001 || Math.abs(value) > 999999999) {
    return value.toExponential(6);
  }
  
  if (Math.abs(value) < 0.01) {
    return value.toFixed(6);
  }
  
  if (Math.abs(value) < 1) {
    return value.toFixed(4);
  }
  
  if (Number.isInteger(value)) {
    return value.toString();
  }
  
  // Special case for temperature
  if (category === 'temperature') {
    return value.toFixed(2);
  }
  
  return value.toFixed(Math.abs(value) < 100 ? 3 : 2);
};
