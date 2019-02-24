import { IAlienRomanLookup } from '../interfaces/alien-digit.model';
import { romanLookup, romanSubstractable } from '../config/roman.config';

/**
 * Replace the words in text by providing the lookup information
 * @param text The original text to be replaced
 * @param lookups Contains the keywords to be replaced and the target word to be replaced to
 */
export const replaceText = (text: string, lookups: { from: string; to: string }[]): string => {
  const replacedText = lookups.reduce((acc, lookup) => {
    return acc.replace(lookup.from, lookup.to);
  }, text);

  return replacedText;
};

/**
 * Extract the number from the text
 * @param text The original text
 * @return The extracted number from the text
 */
export const extractNumber = (text: string): number => {
  const numberRegex = /\d+/;
  const [numberText] = numberRegex.exec(text);
  const number = Number(numberText);
  return number;
};

/**
 * Extract the alien number from the given texts by folloing lookups
 * @param text The original text with alien digits
 * @param lookups The lookup definition consisting of alien digit and roman digit
 * @return The alien number text extracted from the given text
 */
export const extractAlienNumber = (text: string, lookups: string[]) => {
  const words = text.split(' ');
  const alienDigits = words.filter(word => lookups.find(lookup => lookup === word));
  return alienDigits.join(' ');
};

/**
 * Extract roman number from alien number and then translate it into digit number
 * @param text The original text with alien digits
 * @param lookups The lookup definition to help translate from alien digit to roman digit
 * @return The digit number extracted from the text
 */
export const extractDigitNumber = (text: string, lookups: IAlienRomanLookup[]) => {
  const words = text.split(' ');
  const romanDigits = words.map(word => {
    const target = lookups.find(lookup => lookup.alien === word);
    return target ? target.roman : '';
  });

  const romanNumber = romanDigits.join('');
  const digitNumber = this.translateRoman(romanNumber);

  return digitNumber;
};

/**
 * Translate a roman number into a numeric digit number
 * @param roman The roman number to be translated into numeric digit
 * @return The digit number
 */
export const translateRoman = (roman: string) => {
  const isLVDNotUnique = /(L{2,}|V{2,}|D{2,})/.test(roman);
  const isIXCMAppearMoreThan3Times = /(I{4,}|X{4,}|C{4,})|M{4,}/.test(roman);

  if (isLVDNotUnique || isIXCMAppearMoreThan3Times) {
    throw new Error(`${roman} is not a valid roman number.`);
  }

  const digits = roman.split('');
  let number = romanLookup[digits[0]];

  for (let i = 1; i < digits.length; i++) {
    const curr = digits[i];
    const prev = digits[i - 1];
    const next = digits[i + 1];

    // Throw error if the roman has next value larger than previous value. e.g. IIV
    if (!!romanLookup[next] && romanLookup[next] > romanLookup[prev]) {
      throw new Error(`${roman} is not a valid roman number.`);
    }

    if (romanLookup[prev] >= romanLookup[curr]) {
      number += romanLookup[curr];
    } else {
      // Throw error if the previous value is not allowed to be substracted from the current value
      // according to the configuration. e.g. IM
      if (romanSubstractable[prev] && !romanSubstractable[prev].find(n => n === curr)) {
        throw new Error(`${roman} is not a valid roman number.`);
      }
      number = number - romanLookup[prev] * 2 + romanLookup[curr];
    }
  }

  return number;
};
