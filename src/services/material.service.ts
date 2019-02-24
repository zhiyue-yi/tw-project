import { IMaterial } from '../interfaces/material.model';
import { IAlienRomanLookup } from '../interfaces/alien-digit.model';
import { extractNumber, extractDigitNumber, extractAlienNumber } from '../helpers/utils';
import { RomanService } from './roman.service';

export class MaterialService {
  public materials: IMaterial[] = [];
  private MATERIAL_POSITION_FROM_END_OF_TEXT = 4;

  constructor() {}

  /**
   * Construct available currency from the instructions given
   * @param instructions The material definition instructions which can construct material list
   * @param alienDigits The alien digit configurations
   */
  public constructMaterialList(instructions: string[], romanLookUp: IAlienRomanLookup[]) {
    const lookups: IAlienRomanLookup[] = romanLookUp;

    const materialInfo = instructions.map(instruction => {
      const words = instruction.split(' ');
      const name = words[words.length - this.MATERIAL_POSITION_FROM_END_OF_TEXT];
      const totalCost = extractNumber(instruction);
      const quantity = extractDigitNumber(instruction, lookups);

      if (!!this.materials.find(m => m.name === name)) {
        throw new Error(`The material ${name} is duplicated`);
      }

      if (!quantity) {
        throw new Error(`The material ${name} has no quantity`);
      }

      if (!totalCost) {
        throw new Error(`The material ${name} has no total cost`);
      }

      return {
        name,
        totalCost,
        quantity,
      };
    });

    this.materials = materialInfo.map(info => {
      return {
        name: info.name,
        price: Math.round((info.totalCost / info.quantity) * 100) / 100,
      };
    });
  }

  /**
   *
   * @param instructions The material question instructions
   * @param alienDigits The alien digit configurations
   */
  public answerMaterialQuestion(instruction: string, romanLookUp: IAlienRomanLookup[]) {
    const lookups: IAlienRomanLookup[] = romanLookUp;

    const alienNumber = extractAlienNumber(instruction, lookups.map(lookup => lookup.alien));
    const quantity = extractDigitNumber(instruction, lookups);
    const material = this.extractMaterial(instruction);
    const totalCost = material.price * quantity;

    console.log(`${alienNumber} ${material.name} is ${totalCost} Credits`);
  }

  /**
   * Extract the material name from the instruction
   * @param instruction The instruction contains material name
   */
  public extractMaterial(instruction: string) {
    const material = this.materials.find(material => instruction.indexOf(material.name) >= 0);

    if(!material) {
      throw new Error(`No material is found!`);
    }

    return material;
  }
}
