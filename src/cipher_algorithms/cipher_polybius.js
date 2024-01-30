import { alphabet, filterInput } from "./cipher.js";

export function checkKey(key) {
  let letters = [...alphabet];
  key.forEach((row) => {
    row.forEach((letter) => {
      if (letters.includes(letter))
        letters.splice(letters.indexOf(letter, 0), 1);
    });
  });
  if (letters.length === 0) return true;
  else return false;
}

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

function findRow(char, key) {
  return key.findIndex((x) => x.includes(char));
}

export function cipherPolybius(text, key, primeBool) {
  let filteredText = filterInput(text);
  if (filteredText.length === 0) return "Brak znaków do zaszyfrowania!";
  let output = "";
  let row;
  let col;
  let letterIndex = 1;

  filteredText.forEach((char) => {
    row = findRow(char, key);
    col = key[row].indexOf(char);
    row += 1;
    col += 1;
    if(primeBool)
      isPrime(letterIndex)
        ? (output += col.toString() + row.toString())
        : (output += row.toString() + col.toString());
    else
      output += row.toString() + col.toString();
    letterIndex++;
  });
  return output;
}

export function decipherPolybius(input, key, primeBool) {
  if (!(input.length % 2 === 0) && !(input.match(/[^1-7]/g)))
    return "Nieprawidowy szyfrogram, wprowadź parzystą liczbe cyfr."
  else if(input.match(/[^1-7]/g))
    return "Nieprawidowy szyfrogram, wprowadź wyłącznie cyfry 1-7."
  let letters = input.match(/.{1,2}/g);
  let letterIndex = 1;
  let output = "";
  let col;
  let row;
  let finished = true;

  letters.forEach((numPair) => {
    if(primeBool && isPrime(letterIndex)){
      row = numPair[1];
      col = numPair[0];
    }
    else {
      row = numPair[0];
      col = numPair[1];
    }
    if (row > 5 || col > 7){
      return finished = false;
    }
    row--;  //zamiana cyfry wiersza na indeks
    col--;  //zamiana cyfry kolumny na indeks
    output += key[row][col];
    letterIndex++;
  })
  if (!finished)
    output =  "Nieprawidłowy szyfrogram, któraś z cyfr nie jest indeksem w tabeli 5x7"
  return output;
  
}
