import { expect } from 'chai';
import { InstructionService } from './instruction.service';

describe('Instruction Service', () => {
  const instructionService = new InstructionService();
  it('Should correctly read from files', () => {
    const lines = instructionService.readRawData('data/test-input.txt');

    expect(lines.length).to.equal(4);
    expect(lines[3]).to.equal('abcd');
  });

  it('Should correctly classfify the instructions', () => {
    const instructions = [
      'lakj is T',
      'asdfs are I',
      'sadf is I',
      'asdk is Ms',
      'rqew is M',
      'glob glob Silver is 34 Credits',
      'asdfk Silver is 34 Credits',
      'glob prok Gold is 57800 Credits',
      'glob Silver is 34 Creditss',
      'glob glob Silver is 34 Creditss',
      'glob glob Silver is 34 credits',
      'how much is pish tegj glob glob ?',
      'how much is pish tegj glob glob tegj glob glob?',
      'how much is pish tegj glob glob ',
      'how much is pish tegj glob glob ? glob tegj glob glob ?',
      'asdlf much is pish tegj glob glob ?',
      'how many Credits is glob prok Silver ?',
      'how many Credits is glob prok Silver ',
      'how many Credits is glob prok Silver ??',
      'how many Credits is glob prok Gold ?',
      'how much wood could a woodchuck chuck if a woodchuck could chuck ',
    ];

    const classifiedInstructions = instructionService.classifyInstructions(instructions);
    expect(classifiedInstructions.filter(x => x.type === 'digitDefinitions').length).to.equal(2);
    expect(classifiedInstructions.filter(x => x.type === 'materialDefinitions').length).to.equal(3);
    expect(classifiedInstructions.filter(x => x.type === 'digitQuestions').length).to.equal(2);
    expect(classifiedInstructions.filter(x => x.type === 'materialQuestions').length).to.equal(2);
    expect(classifiedInstructions.filter(x => x.type === 'others').length).to.equal(instructions.length - 9);
  });
});
