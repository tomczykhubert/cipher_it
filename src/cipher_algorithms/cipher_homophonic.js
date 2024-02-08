import { filterInput } from "./cipher";

const signsQuantity = {
  'A': 9,
  'Ą': 1,
  'B': 1,
  'C': 4,
  'Ć': 1,
  'D': 3,
  'E': 8,
  'Ę': 1,
  'F': 1,
  'G': 1,
  'H': 1,
  'I': 8,
  'J': 2,
  'K': 4,
  'L': 2,
  'Ł': 2,
  'M': 3,
  'N': 6,
  'Ń': 1,
  'O': 8,
  'Ó': 1,
  'P': 3,
  'Q': 1,
  'R': 5,
  'S': 4,
  'Ś': 1,
  'T': 4,
  'U': 3,
  'V': 1,
  'W': 5,
  'X': 1,
  'Y': 4,
  'Z': 6,
  'Ź': 1,
  'Ż': 1,
};

const signsBefore = {
  'A': 0,
  'Ą': 9,
  'B': 10,
  'C': 11,
  'Ć': 15,
  'D': 16,
  'E': 19,
  'Ę': 27,
  'F': 28,
  'G': 29,
  'H': 30,
  'I': 31,
  'J': 39,
  'K': 41,
  'L': 45,
  'Ł': 47,
  'M': 49,
  'N': 52,
  'Ń': 58,
  'O': 59,
  'Ó': 67,
  'P': 68,
  'Q': 71,
  'R': 72,
  'S': 77,
  'Ś': 81,
  'T': 82,
  'U': 86,
  'V': 89,
  'W': 90,
  'X': 95,
  'Y': 96,
  'Z': 100,
  'Ź': 106,
  'Ż': 107,
}

export function checkKey(key) {
  if (key.length === 324)
    if (/\d/.test(key)){
      let keyArray = key.match(/.{1,3}/g);
      for (let i = 0; i < keyArray.length; i++)
        for (let j = 0; j < keyArray.length; j++){
          if (keyArray[i] === keyArray[j] && i !== j)
            return false;
        }
      return true;
    }
    else{
      return false;
    }
  else{
    return false;
  }
}

function findSubKey(key, letter){
  let signQuantity = signsQuantity[letter];
  let signsBeforeQuantity = signsBefore[letter];
  let subKey = key.slice(signsBeforeQuantity * 3, (signQuantity + signsBeforeQuantity) * 3);
  let rnd = Math.floor(Math.random() * signQuantity);
  return subKey.slice(rnd * 3, rnd * 3 + 3);
}

function findLetter(key, numbers){
  let splittedKey = key.match(/.{1,3}/g);
  let index = splittedKey.indexOf(numbers);
  if (index === -1)
    return "error"
  else{
    const findKeyValue = Object.entries(signsBefore).reduce((previous, current) => (current[1] <= index && current[1] > previous[1] ? current : previous), Object.entries(signsBefore)[0]);
    return findKeyValue[0];
  }
}

export function cipherHomophonic(input, key) {
  let subKey = "";
  let filteredInput = filterInput(input);
  if(filteredInput.length === 0)
    return "Brak znaków do zaszyfrowania!";
  let result = "";
  for(let i = 0; i < filteredInput.length; i++){
    subKey = findSubKey(key, filteredInput[i]);
    result += subKey.toString();
  }
  return result;
}

export function decipherHomophonic(input, key) {
  let letter;
  let filteredInput = input.replace(/\D/g,'');
  if(filteredInput.length === 0)
    return "Brak znaków do zdeszyfrowania!";
  let result = '';
  let inputArray = filteredInput.match(/.{1,3}/g)
  for(let i = 0; i < inputArray.length; i++){
    letter = findLetter(key, inputArray[i])
    if (letter === "error")
      return "Nieprawidłowy szyfrogram, któraś część szyfrogramu nie odpowiada żadnej literze w kluczu!"
    else
      result += letter;
  }
  return result;
}
