# ThoughtWorks Code Assignment

This project is especially for the code assignment, **Problem Three: Merchant's Guide to the Galaxy** from ThoughtWorks.

The project is built using TypeScript. To run the project, TypeScript will be compiled into JavaScript and executed under Node.js environment.

The unit test framework is Mocha.js and the TDD assertion library is Chai.js.

The program is required to 
1. receive a series of text input,
2. identify the conditions from the text input,
3. build the rules and settings and
4. answer questions according to the rules and settings.

## Installation

Run the following command to install all the dependencies.

    $ npm install

Run the following command to start the project. Then the result will be printed in the console.

    $ npm start

Run the following command to do automated unit testing.

    $ npm run test

## Project Structure Explanation

The project consists of the following folders and files.

- **.babelrc** includes configurations of Babel to translate es6 syntax to es5 syntax.

- **.prettierrc** includes configurations of source code formatter in vs code.

- **.package.json** includes configurations of node.js project such as script command and project dependencies.

- **.tsconfig.json** includes configuration of typescript settings for the project.

- **.tslint.json** includes configuration of typescript lint settings for th project.

- ***.test.ts** are the files with postfix, .test.ts, which contains various functions for unit test.

### data

data folder includes raw text files as inputs.

- **data/sample-input.txt** includes raw text of instructions as input to the program.

- **data/text-input.txt** includes raw test for unit tests.

### src

src folder includes all the source codes.

- **src/app.ts** is the starting point of the whole program. It starts the program by calling static run() function in the main.ts

- **src/main.ts** is the main class containing the procedures the program must executed and the associations of different services to perform the required tasks.

#### config

config folder includes all the necessary configuration constants used in the project and are exported in JSON format.

- **src/config/roman.config.ts** defines the roman character and its corresponding values and constraints.

#### helpers

helpers folder includes necessary functions to be exported to help the program executions. They can be deemed as static functions.

- **src/helpers/utils.ts** defines a number of helper funcions such as Roman number converter.

#### interfaces

interfaces folder includes the definitions of the data structures used in this project.

- **src/interfaces/alien-digit.model.ts** defines a data structure to map an alien digit to a roman digit such as __glob__ is __I__ in roman.

- **src/interfaces/instruction.model.ts** defines a data structure to store an instruction and its type.

- **src/interfaces/material.model.ts** defines a data structure to store information about a material including the material name, and its unit price.

#### services

services folder include the descriptions of program logics and its operations grouped by different domains.

- **src/services/instruction.service.ts** includes program logics such as reading raw text from a file and classify the text into different instruction types.

- **src/services/material.service.ts** includes program logics about material part involving definitions and question answering.

- **src/services/roman.service.ts** includes program logics about roman number involving definition extractions from alien characters and question answerings.

## Constraints and Area of Improvements

The concepts of services are borrowed from Angular. 

Initially, I wanted to implement dependency injection concepts into this project. 

It is because most of the components in a project have different dependencies on one another. For example, Main depends on RomanService and MaterialService, and then MaterialService also depends on RomanService. In this case, if dependency injections are used, there should be only one instance of a particular service through the lifecycle of the program and within each class, reducing the complexity of project and decouple the dependencies.

For example, instead of this codes
```javascript
class Main {
  constructor() {}

  static run() {
    const romanService = new RomanService();
    const materialService = new MaterialService();
    const instructionService = new InstructionService();

    const instructions = instructionService.readRawData('data/sample-input.txt');
    const classifiedInstructions = instructionService.classifyInstructions(instructions);

    // other codes...
  }
}
```

The following codes would have a neater layout and better structure. And those services injected are from the global singleton instances.
```javascript
class Main {
  constructor(
    private romanService: RomanService,
    private materialService: MaterialService,
    private instructionService: InstructionService,
  ) {}

  static run() {
    const instructions = this.instructionService.readRawData('data/sample-input.txt');
    const classifiedInstructions = this.instructionService.classifyInstructions(instructions);

    // other codes...
  }
}
```

Since 3rd party libraries are not allowed, I built my own dependency injection mechanism using TypeScript decorator features.

However, unfortunately, due to time constraints and difficuly of implementations, I could not achieve this feature, dependency injection, in this project, but only can complete the project using normal object oriented way.

Thanks to this assignment, I realized that the simple features in my daily used frameworks actually resolved such troublesome problems like dependency injections. 

Thank you for the opportunity for this job application and assignment!