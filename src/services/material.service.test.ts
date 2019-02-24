import { expect } from 'chai';
import { MaterialService } from './material.service';

describe('Material service', () => {
  const materialService = new MaterialService();
  const romanLookup = [
    { alien: 'glob', roman: 'I'},
    { alien: 'prok', roman: 'V'},
    { alien: 'pish', roman: 'X'},
    { alien: 'tegj', roman: 'L'},
  ];

  it('Should construct the material list', () => {
    const sample = [
      'glob glob Silver is 34 Credits',
      'glob prok Gold is 57800 Credits',
      'pish pish Iron is 3910 Credits',
    ];

    materialService.constructMaterialList(sample, romanLookup);

    expect(materialService.materials.length).to.equal(3);
  });

  it('Should find duplicated material', () => {
    const sample = [
      'glob glob Silver is 34 Credits',
      'glob prok Silver is 57800 Credits',
      'pish pish Iron is 3910 Credits',
    ];

    expect(() => materialService.constructMaterialList(sample, romanLookup)).to.throw();
  });

  it('Should reject material with no quantity specified', () => {
    const sample = [
      'glob glob Silver is 34 Credits',
      'glob prok Gold is 57800 Credits',
      'Iron is 3910 Credits',
    ];

    expect(() => materialService.constructMaterialList(sample, romanLookup)).to.throw();
  });

  it('Should reject material with no total cost', () => {
    const sample = [
      'glob glob Silver is free',
      'glob prok Gold is 57800 Credits',
      'pish pish Iron is 3910 Credits',
    ];

    expect(() => materialService.constructMaterialList(sample, romanLookup)).to.throw();
  });

  it('Should extract materials correctly', () => {
    const instruction = 'how many Credits is glob prok Iron ?';
    const material = materialService.extractMaterial(instruction);

    expect(material.name).to.equal('Iron');
  });

  it('Should raise error if the material is not existed', () => {
    const instruction = 'how many Credits is glob prok Aluminium ?';

    expect(() => materialService.extractMaterial(instruction)).throw();
  });
});
