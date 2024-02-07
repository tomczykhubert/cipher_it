import { alphabet, filterInput } from "./cipher.js";

export function checkKey(key) {
  if (isNaN(key) || key === "") return false;
  else return key >= 1 && key <= 34;
}

function mod(x, y) {
  return ((x % y) + y) % y;
}

export function cipherCaesar(text, key, direction) {
  let filteredText = filterInput(text);
  let output = "";
  if (filteredText.length === 0)
    if (direction === 1) return "Brak znaków do zaszyfrowania!";
    else return "Brak znaków do zdeszyfrowania!";

  filteredText.map((char) => {
    const index = alphabet.indexOf(char);
    const newLetterIndex = mod(index + (key * direction), alphabet.length)
    return (output += alphabet.at(newLetterIndex));
  });
  return output;
}
