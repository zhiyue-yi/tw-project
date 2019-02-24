import { IAlienRomanLookup } from '../interfaces/alien-digit.model';
import { extractAlienNumber, extractDigitNumber } from '../helpers/utils';
import { romanLookup } from '../config/roman.config';

export class RomanService {
  public romanLookup: IAlienRomanLookup[] = [];

  constructor() {}

  /**
   * Construct available currency from the instructions given
   * @param instructions The digit definition instructions which can construct roman digit
   */
  public constructRomanDigit(instructions: string[]) {
    this.romanLookup = instructions.map(ins => {
      const words = ins.split(' ');
      const alien = words[0];
      const roman = words[2];

      if (!romanLookup[roman]) {
        throw new Error(`${roman} can\'t be found in Roman numbers.`);
      }

      if (!!this.romanLookup.find(x => x.roman === roman)) {
        throw new Error(`${roman} has already been set.`);
      }

      if (!!this.romanLookup.find(x => x.alien === alien)) {
        throw new Error(`${alien} has already been used.`);
      }

      return {
        alien,
        roman,
      };
    });
  }

  /**
   *
   * @param instructions The instructions of digital questions
   */
  public answerDigitQuestion(instruction: string) {
    const alien = extractAlienNumber(instruction, this.romanLookup.map(lookup => lookup.alien));
    const digit = extractDigitNumber(instruction, this.romanLookup);

    console.log(`${alien} is ${digit}`);
  }
}
