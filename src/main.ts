import { RomanService } from './services/roman.service';
import { InstructionService } from './services/instruction.service';
import { MaterialService } from './services/material.service';

export class Main {
  constructor() {}

  static run() {
    const romanService = new RomanService();
    const materialService = new MaterialService();
    const instructionService = new InstructionService();

    const instructions = instructionService.readRawData('data/sample-input.txt');
    const classifiedInstructions = instructionService.classifyInstructions(instructions);

    romanService.constructRomanDigit(
      classifiedInstructions.filter(x => x.type === 'digitDefinitions').map(x => x.content),
    );

    materialService.constructMaterialList(
      classifiedInstructions.filter(x => x.type === 'materialDefinitions').map(x => x.content),
      romanService.romanLookup,
    );

    // console.log(romanService.alienDigits);
    // console.log(materialService.materials);

    classifiedInstructions.forEach(instruction => {
      switch (instruction.type) {
        case 'digitDefinitions':
        case 'materialDefinitions':
          break;
        case 'digitQuestions':
          romanService.answerDigitQuestion(instruction.content);
          break;
        case 'materialQuestions':
          materialService.answerMaterialQuestion(instruction.content, romanService.romanLookup);
          break;
        default:
          instructionService.printUnknownInstruction();
          break;
      }
    });
  }
}
