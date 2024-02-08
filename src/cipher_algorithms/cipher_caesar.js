import { alphabet, filterInput } from "./cipher.js";

export function checkKey(key) {
  if (isNaN(key) || key === "") return false;
  else return key >= 1 && key <= 34;
}

function modulo(x, y) {
  return ((x % y) + y) % y;
}

function mapping(text, key, direction) {
  let filteredText = filterInput(text);
  let output = "";
  if (filteredText.length === 0)
    if (direction === 1) return "Brak znaków do zaszyfrowania!";
    else return "Brak znaków do zdeszyfrowania!";

  filteredText.map((char) => {
    const index = alphabet.indexOf(char);
    const newLetterIndex = modulo(index + (key * direction), alphabet.length)
    return (output += alphabet.at(newLetterIndex));
  });
  return output;
}

export function cipherCaesar(input, key){
  return mapping(input,key,1);
}

export function decipherCaesar(input, key){
  return mapping(input,key,-1);
}