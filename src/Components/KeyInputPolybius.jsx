import React, { useState } from "react";
import { alphabet } from "../cipher_algorithms/cipher.js";

function KeyInput({ exportKey }) {
  const [inputArray, setInputArray] = useState([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);

  function generateKey() {
    const letters = [...alphabet];
    const newKey = [...inputArray];
    let alphaIndex = new Int16Array();
    newKey.forEach((row) => {
      row.forEach((letter) => {
        alphaIndex = Math.floor(Math.random() * letters.length);
        newKey[newKey.indexOf(row)][row.indexOf(letter)] = letters[alphaIndex];
        letters.splice(alphaIndex, 1);
      });
    });
    setInputArray(newKey);
    exportKey(inputArray);
  }

  function copyKey() {
    navigator.clipboard.writeText(JSON.stringify(inputArray));
  }

  async function pasteKey(){
    let pasted = await navigator.clipboard.readText();
    pasted = JSON.parse(pasted);
    setInputArray(pasted);
  }

  const handleInputChange = (index, indexRow, value) => {
    if (value.length > 1) {
      value = value[0];
      return;
    }
    const newArray = [...inputArray];
    newArray[indexRow][index] = value.toUpperCase();
    setInputArray(newArray);
    exportKey(inputArray);
  };

  return (
    <div>
      {inputArray.map((row, indexRow) => {
        return (
          <div key={indexRow}>
            {row.map((value, index) => {
              return (
                <input
                  className="polybius-key"
                  key={index}
                  type="text"
                  value={value}
                  onChange={(e) => {
                    handleInputChange(index, indexRow, e.target.value);
                  }}
                />
              );
            })}
          </div>
        );
      })}
      <div>
        <div className="button-div">
          <button type="button" className="generate-key" onClick={generateKey}>
            Generuj klucz
          </button>
          <button type="button" className="generate-key" onClick={copyKey}>
            Kopiuj klucz
          </button>
          <button type="button" className="generate-key" onClick={pasteKey}>
            Wklej klucz
          </button>
        </div>
      </div>
    </div>
  );
}

export default KeyInput;
