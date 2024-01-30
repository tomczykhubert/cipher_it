import { alphabet, filterInput } from "./cipher.js";

export function checkKey(key) {
  if (isNaN(key) || key === "") return false;
  else return key >= 1 && key <= 34;
}

export function cipherCaesar(text, key, boolean) {
  let filteredText = filterInput(text);
  let output = "";
  let newLetterIndex;
  if (filteredText.length === 0)
    if (boolean === true) return "Brak znaków do zaszyfrowania!";
    else return "Brak znaków do zdeszyfrowania!";

  filteredText.map((char) => {
    if (boolean === true) newLetterIndex = alphabet.indexOf(char) + Number(key);
    else if (boolean === false)
      newLetterIndex = alphabet.indexOf(char) - Number(key);

    if (newLetterIndex > 34) {
      newLetterIndex = newLetterIndex - 34;
    } else if (newLetterIndex < 0) {
      newLetterIndex = newLetterIndex + 34;
    }
    return (output += alphabet.at(newLetterIndex));
  });
  output = output.toString();
  return output;
}
