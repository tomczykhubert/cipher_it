import { alphabet, filterInput } from "./cipher";

export function checkKey(key){
  return alphabet.includes(key) ? true : false
}

function modulo(x, y) {
  return ((x % y) + y) % y;
}

function mapping(input, key, direction){
  let keyIndex = alphabet.indexOf(key);
  let filteredInput = filterInput(input);
  console.log(filteredInput);
  if (filteredInput.length === 0){
    if(direction === 1)
      return "Brak znaków do zaszyfrowania!";
    else
      return "Brak znaków do zdeszyfrowania!";    
  }
  else{
    let result = ""
    for (let i = 0; i < filteredInput.length; i++){
      let letter = filteredInput[i];
      let index = alphabet.indexOf(letter);
      let outputIndex = modulo(index + ((keyIndex + i) * direction), alphabet.length);
      result += alphabet[outputIndex];
    }
    return result;
  }
}

export function cipherTrithemius(input, key){
  return mapping(input, key, 1);
}

export function decipherTrithemius(input, key){
  return mapping(input, key, -1);
}