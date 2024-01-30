export const alphabet = [
  'A',
  'Ą',
  'B',
  'C',
  'Ć',
  'D',
  'E',
  'Ę',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'Ł',
  'M',
  'N',
  'Ń',
  'O',
  'Ó',
  'P',
  'Q',
  'R',
  'S',
  'Ś',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'Ź',
  'Ż',
];

export function filterInput(input) {
  input = input.toUpperCase();
  let filteredInput 
   = [];
  let inputArray = input.split('');
  inputArray.forEach((char) => {
    if (alphabet.includes(char)) filteredInput.push(char);
  });
  return filteredInput;
}