import { expect } from 'chai';
import { replaceText, translateRoman, extractNumber, extractAlienNumber, extractDigitNumber } from './utils';

describe('Util: replaceText()', () => {
  it('Should correctly replace the texts', () => {
    const originText = 'glob prok Gold is 57800 Credits';
    const lookups = [
      { from: 'glob', to: 'I' },
      { from: 'prok', to: 'V' },
      { from: 'pish', to: 'X' },
      { from: 'tegj', to: 'L' },
    ];
    const replacedText = replaceText(originText, lookups);

    expect(replacedText).to.equal('I V Gold is 57800 Credits');
  });
});

describe('Util: extractNumber()', () => {
  it('Should correctly extract the number from the text', () => {
    const text = 'glob prok Gold is 57800 Credits';
    const number = extractNumber(text);

    expect(number).to.equal(57800);
  });
});

describe('Util: extractAlienNumber()', () => {
  it('Should correctly extract alien numbers from the array with given lookup', () => {
    const lookups = ['glob', 'prok', 'pish', 'tegj'];

    const alien1 = extractAlienNumber('glob prok Gold is 57800 Credits', lookups);
    const alien2 = extractAlienNumber('no Gold is worth no Credits', lookups);

    expect(alien1).to.equal('glob prok');
    expect(alien2).to.equal('');
  });
});

describe('Util: extractDigitNumber()', () => {
  it('Should correctly extract numeric digit number from the given text with alien digits', () => {
    const lookups = [
      { alien: 'glob', roman: 'I' },
      { alien: 'prok', roman: 'V' },
      { alien: 'pish', roman: 'X' },
      { alien: 'tegj', roman: 'L' },
    ];

    const numericDigit1 = extractDigitNumber('glob prok Gold is 57800 Credits', lookups);
    const numericDigit2 = extractDigitNumber('globb prok Gold is 57800 Credits', lookups);

    expect(numericDigit1).to.equal(4);
    expect(numericDigit2).to.equal(5);
  });
});

describe('Util: translateRoman()', () => {
  it('Should translate roman number to digit number correctly', () => {
    expect(translateRoman('II')).to.equal(2);
    expect(translateRoman('XXVI')).to.equal(26);
    expect(translateRoman('CI')).to.equal(101);
    expect(translateRoman('XLII')).to.equal(42);
    expect(translateRoman('XXXIX')).to.equal(39);
    expect(() => translateRoman('IMX')).to.throw();
    expect(() => translateRoman('IM')).to.throw();
  });

  it('Should throw error if the roman has next value larger than previous value', () => {
    expect(() => translateRoman('IIV')).to.throw();
    expect(() => translateRoman('IIIX')).to.throw();
  });

  it('Should throw error if the roman has more than 3 consecutive I/X/C/M', () => {
    expect(() => translateRoman('IIII')).to.throw();
    expect(() => translateRoman('XXXX')).to.throw();
    expect(() => translateRoman('CCCC')).to.throw();
    expect(() => translateRoman('MMMM')).to.throw();
    expect(() => translateRoman('IIV')).to.throw();
    expect(() => translateRoman('CCM')).to.throw();
    expect(translateRoman('III')).to.equal(3);
    expect(translateRoman('XXX')).to.equal(30);
    expect(translateRoman('CCC')).to.equal(300);
    expect(translateRoman('MMM')).to.equal(3000);
  });

  it('Should throw error if the roman has more than 1 consecutive L/V/D', () => {
    expect(() => translateRoman('VV')).to.throw();
    expect(() => translateRoman('LL')).to.throw();
    expect(() => translateRoman('DD')).to.throw();
    expect(() => translateRoman('DDI')).to.throw();
  });

  it('Should throw error if I/X/C is subsctracted from disallowed roman digits', () => {
    expect(() => translateRoman('IM')).to.throw();
    expect(() => translateRoman('XM')).to.throw();
    expect(translateRoman('IX')).to.equal(9);
    expect(translateRoman('IV')).to.equal(4);
    expect(translateRoman('XL')).to.equal(40);
    expect(translateRoman('CM')).to.equal(900);
    expect(translateRoman('CX')).to.equal(110);
  });
});
