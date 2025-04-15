
// Logic Converter Utilities
// These functions handle various number system and logic conversions

// Binary, Decimal, Hexadecimal, and Octal Conversions
export const convertBinary = {
  // Binary to Decimal
  toDecimal: (binary: string): string => {
    // Verify input is valid binary
    if (!/^[01]+$/.test(binary)) {
      return 'Invalid binary input';
    }
    return parseInt(binary, 2).toString();
  },
  
  // Binary to Hexadecimal
  toHex: (binary: string): string => {
    // Verify input is valid binary
    if (!/^[01]+$/.test(binary)) {
      return 'Invalid binary input';
    }
    return parseInt(binary, 2).toString(16).toUpperCase();
  },
  
  // Binary to Octal
  toOctal: (binary: string): string => {
    // Verify input is valid binary
    if (!/^[01]+$/.test(binary)) {
      return 'Invalid binary input';
    }
    return parseInt(binary, 2).toString(8);
  }
};

export const convertDecimal = {
  // Decimal to Binary
  toBinary: (decimal: string): string => {
    // Verify input is valid decimal
    if (!/^[0-9]+$/.test(decimal)) {
      return 'Invalid decimal input';
    }
    return parseInt(decimal, 10).toString(2);
  },
  
  // Decimal to Hexadecimal
  toHex: (decimal: string): string => {
    // Verify input is valid decimal
    if (!/^[0-9]+$/.test(decimal)) {
      return 'Invalid decimal input';
    }
    return parseInt(decimal, 10).toString(16).toUpperCase();
  },
  
  // Decimal to Octal
  toOctal: (decimal: string): string => {
    // Verify input is valid decimal
    if (!/^[0-9]+$/.test(decimal)) {
      return 'Invalid decimal input';
    }
    return parseInt(decimal, 10).toString(8);
  }
};

export const convertHex = {
  // Hexadecimal to Binary
  toBinary: (hex: string): string => {
    // Verify input is valid hexadecimal
    if (!/^[0-9A-Fa-f]+$/.test(hex)) {
      return 'Invalid hexadecimal input';
    }
    return parseInt(hex, 16).toString(2);
  },
  
  // Hexadecimal to Decimal
  toDecimal: (hex: string): string => {
    // Verify input is valid hexadecimal
    if (!/^[0-9A-Fa-f]+$/.test(hex)) {
      return 'Invalid hexadecimal input';
    }
    return parseInt(hex, 16).toString();
  },
  
  // Hexadecimal to Octal
  toOctal: (hex: string): string => {
    // Verify input is valid hexadecimal
    if (!/^[0-9A-Fa-f]+$/.test(hex)) {
      return 'Invalid hexadecimal input';
    }
    return parseInt(hex, 16).toString(8);
  }
};

export const convertOctal = {
  // Octal to Binary
  toBinary: (octal: string): string => {
    // Verify input is valid octal
    if (!/^[0-7]+$/.test(octal)) {
      return 'Invalid octal input';
    }
    return parseInt(octal, 8).toString(2);
  },
  
  // Octal to Decimal
  toDecimal: (octal: string): string => {
    // Verify input is valid octal
    if (!/^[0-7]+$/.test(octal)) {
      return 'Invalid octal input';
    }
    return parseInt(octal, 8).toString();
  },
  
  // Octal to Hexadecimal
  toHex: (octal: string): string => {
    // Verify input is valid octal
    if (!/^[0-7]+$/.test(octal)) {
      return 'Invalid octal input';
    }
    return parseInt(octal, 8).toString(16).toUpperCase();
  }
};

// Roman Numerals Conversion
export const romanNumerals = {
  // Arabic to Roman
  toRoman: (num: number): string => {
    if (num <= 0 || num > 3999 || !Number.isInteger(num)) {
      return 'Invalid input (must be 1-3999)';
    }
    
    const romanMap = [
      { value: 1000, symbol: 'M' },
      { value: 900, symbol: 'CM' },
      { value: 500, symbol: 'D' },
      { value: 400, symbol: 'CD' },
      { value: 100, symbol: 'C' },
      { value: 90, symbol: 'XC' },
      { value: 50, symbol: 'L' },
      { value: 40, symbol: 'XL' },
      { value: 10, symbol: 'X' },
      { value: 9, symbol: 'IX' },
      { value: 5, symbol: 'V' },
      { value: 4, symbol: 'IV' },
      { value: 1, symbol: 'I' }
    ];
    
    let result = '';
    for (const item of romanMap) {
      while (num >= item.value) {
        result += item.symbol;
        num -= item.value;
      }
    }
    
    return result;
  },
  
  // Roman to Arabic
  fromRoman: (roman: string): string => {
    // Verify input is valid roman numeral
    if (!/^[IVXLCDM]+$/i.test(roman)) {
      return 'Invalid Roman numeral';
    }
    
    const romanMap: Record<string, number> = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
    };
    
    const str = roman.toUpperCase();
    let result = 0;
    
    for (let i = 0; i < str.length; i++) {
      const current = romanMap[str[i]];
      const next = i + 1 < str.length ? romanMap[str[i + 1]] : 0;
      
      if (current < next) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }
    
    return result.toString();
  }
};

// Morse Code Conversion
export const morseCode = {
  // Text to Morse Code
  toMorse: (text: string): string => {
    if (!text) return '';
    
    const morseMap: Record<string, string> = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 
      'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
      'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
      '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--',
      '?': '..--..', '\'': '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
      ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
      '$': '...-..-', '@': '.--.-.', ' ': '/'
    };
    
    return text
      .toUpperCase()
      .split('')
      .map(char => morseMap[char] || char)
      .join(' ')
      .replace(/\s+/g, ' ');
  },
  
  // Morse Code to Text
  fromMorse: (morse: string): string => {
    if (!morse) return '';
    
    const morseMap: Record<string, string> = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H',
      '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P',
      '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
      '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9', '.-.-.-': '.', '--..--': ',',
      '..--..': '?', '.----.': '\'', '-.-.--': '!', '-..-.': '/', '-.--.': '(', '-.--.-': ')', '.-...': '&',
      '---...': ':', '-.-.-.': ';', '-...-': '=', '.-.-.': '+', '-....-': '-', '..--.-': '_', '.-..-.': '"',
      '...-..-': '$', '.--.-.': '@', '/': ' '
    };
    
    return morse
      .split(' ')
      .map(code => morseMap[code] || code)
      .join('');
  }
};

// Braille Conversion (ASCII representation)
export const braille = {
  // Text to Braille
  toBraille: (text: string): string => {
    if (!text) return '';
    
    const brailleMap: Record<string, string> = {
      'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
      'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
      'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': '⠀',
      '0': '⠼⠚', '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑',
      '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊',
      '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', '\'': '⠄', '"': '⠐⠂', ';': '⠆', ':': '⠒',
      '-': '⠤', '(': '⠐⠣', ')': '⠐⠜'
    };
    
    return text
      .toLowerCase()
      .split('')
      .map(char => brailleMap[char] || char)
      .join('');
  },
  
  // Braille to Text
  fromBraille: (braille: string): string => {
    if (!braille) return '';
    
    const brailleMap: Record<string, string> = {
      '⠁': 'a', '⠃': 'b', '⠉': 'c', '⠙': 'd', '⠑': 'e', '⠋': 'f', '⠛': 'g', '⠓': 'h', '⠊': 'i', '⠚': 'j',
      '⠅': 'k', '⠇': 'l', '⠍': 'm', '⠝': 'n', '⠕': 'o', '⠏': 'p', '⠟': 'q', '⠗': 'r', '⠎': 's', '⠞': 't',
      '⠥': 'u', '⠧': 'v', '⠺': 'w', '⠭': 'x', '⠽': 'y', '⠵': 'z', '⠀': ' ',
      '⠼⠚': '0', '⠼⠁': '1', '⠼⠃': '2', '⠼⠉': '3', '⠼⠙': '4', '⠼⠑': '5',
      '⠼⠋': '6', '⠼⠛': '7', '⠼⠓': '8', '⠼⠊': '9',
      '⠲': '.', '⠂': ',', '⠦': '?', '⠖': '!', '⠄': '\'', '⠐⠂': '"', '⠆': ';', '⠒': ':',
      '⠤': '-', '⠐⠣': '(', '⠐⠜': ')'
    };
    
    let result = '';
    let i = 0;
    
    while (i < braille.length) {
      // Check for number prefix
      if (braille.charAt(i) === '⠼' && i + 1 < braille.length) {
        const numChar = braille.charAt(i) + braille.charAt(i + 1);
        result += brailleMap[numChar] || numChar;
        i += 2;
      } 
      // Check for two-cell characters
      else if (braille.charAt(i) === '⠐' && i + 1 < braille.length) {
        const twoCell = braille.charAt(i) + braille.charAt(i + 1);
        result += brailleMap[twoCell] || twoCell;
        i += 2;
      } 
      // Normal single characters
      else {
        result += brailleMap[braille.charAt(i)] || braille.charAt(i);
        i++;
      }
    }
    
    return result;
  }
};
