export const romanLookup: {[key: string]: number} = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export const romanSubstractable: { [key: string]: string[]} = {
  I: ['V', 'X'],
  X: ['L', 'C'],
  C: ['D', 'M'],
}