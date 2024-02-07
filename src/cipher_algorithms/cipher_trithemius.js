import { alphabet, filterInput } from "./cipher";

export function checkKey(key){
  if(/[^A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/.test(key))
    return false;
  else
    return true;
}

function modulo(x, y) {
  return ((x % y) + y) % y;
}

function mapping(input, key, direction){
  let keyIndex = alphabet.indexOf(key);
  let filteredInput = filterInput(input);
  if (filteredInput === ""){
    if(direction === 1)
      return "Brak znaków do zaszyfrowania!";
    else
      return "Brak znaków do zdeszyfrowania!";    
  }
  else{
    let result = ""
    for (let i = 0; i < filteredInput.length; i++){
      let letter = input[i];
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