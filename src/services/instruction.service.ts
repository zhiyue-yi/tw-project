import { readFileSync } from 'fs';
import { IInstruction } from '../interfaces/instruction.model';

export class InstructionService {
  private readFileSync = readFileSync;

  constructor() {}

  /**
   * Read raw data from the text file given
   * @param path The file path within the project file
   * @return An array of instructions
   */
  public readRawData(path): string[] {
    const lines = this.readFileSync(path);
    const instructrons = lines.toString().split('\r\n');

    return instructrons;
  }

  /**
   * Classify the instructions into different groups based on the regular expression specified
   * @param instructions The instructions from the original text file
   * @return the grouped instructions
   */
  public classifyInstructions(instructions: string[]): IInstruction[] {
    const regexConfig = [
      { type: 'digitDefinitions', regex: /^\S+\sis\s[IVXLCDM]$/ },
      { type: 'materialDefinitions', regex: /^[a-zA-z+\s]+is\s\d+\sCredits$/ },
      { type: 'digitQuestions', regex: /^how\smuch\sis\s[a-zA-Z\s]+[?]$/ },
      { type: 'materialQuestions', regex: /^how\smany\sCredits\sis\s[a-zA-Z\s]+[?]$/ },
    ];

    const classifiedInstructions: IInstruction[] = [];

    instructions.forEach(instruction => {
      let isMatched = false;
      regexConfig.forEach(r => {
        if (r.regex.test(instruction)) {
          isMatched = true;
          classifiedInstructions.push({
            type: r.type,
            content: instruction,
          });
        }
      });
      if (!isMatched) {
        classifiedInstructions.push({
          type: 'others',
          content: instruction,
        });
      }
    });

    return classifiedInstructions;
  }

  /**
   * Print the unknown instructions
   * @param instructions The instructions which are unknown type
   */
  public printUnknownInstruction() {
    console.log('I have no idea what you are talking about');
  }
}
