import { expect } from 'chai';
import { RomanService } from './roman.service';

describe('Roman service', () => {
  const romanService = new RomanService();

  it('Should construct roman number settings', () => {
    const sample = ['glob is I', 'prok is V', 'pish is X', 'tegj is L'];
    romanService.constructRomanDigit(sample);

    expect(romanService.romanLookup.length).to.equal(4);
  });

  it('Should find duplicated roman number', () => {
    const sample = ['glob is I', 'prok is I', 'pish is X', 'tegj is L'];

    expect(() => romanService.constructRomanDigit(sample)).to.throw();
  });

  it('Should find duplicated symbol', () => {
    const sample = ['glob is I', 'prok is V', 'glob is X', 'tegj is L'];

    expect(() => romanService.constructRomanDigit(sample)).to.throw();
  });

  it('Should identify invalid roman number', () => {
    const sample = ['glob is I', 'prok is V', 'pish is A', 'tegj is L'];

    expect(() => romanService.constructRomanDigit(sample)).to.throw();
  });

});
