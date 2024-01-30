import { useState } from "react";
import {
  checkKey,
  cipherHomophonic,
  decipherHomophonic,
} from "../cipher_algorithms/cipher_homophonic.js";

export default function Homophonic() {
  const [cipherInput, setCipherInput] = useState("");
  const [decipherInput, setDecipherInput] = useState("");

  const [cipherOutput, setCipherOutput] = useState("Tu pojawi się szyfrogram.");
  const [decipherOutput, setDecipherOutput] = useState(
    "Tu pojawi się zdeszyfrowany tekst."
  );

  const [cipherKey, setCipherKey] = useState("");
  const [decipherKey, setDecipherKey] = useState("");

  const [cipherAlertShow, setCipherAlertShow] = useState(true);
  const [decipherAlertShow, setDecipherAlertShow] = useState(true);

  const [cipherAlertText, setCipherAlertText] = useState("ERROR_MESSAGE");
  const [decipherAlertText, setDecipherAlertText] = useState("ERROR_MESSAGE");

  function checkCipherKey(key) {
    if (!checkKey(key)) {
      setCipherAlertText("Zły klucz szyfrujący!");
      setCipherAlertShow(true);
      setCipherKey(key);
    } else {
      setCipherAlertShow(false);
      setCipherKey(key);
    }
  }

  function checkDecipherKey(key) {
    if (!checkKey(key)) {
      setCipherAlertText("Zły klucz deszyfrujący!");
      setDecipherAlertShow(true);
      setDecipherKey(key);
    } else {
      setDecipherAlertShow(false);
      setDecipherKey(key);
    }
  }

  const handleCipher = (e) => {
    e.preventDefault();
    if (!checkKey(cipherKey)) return;
    else {
      let output = cipherHomophonic(cipherInput, cipherKey);
      if (output === "Brak znaków do zaszyfrowania!") {
        setCipherAlertText(output);
        setCipherAlertShow(true);
      } else {
        setCipherAlertShow(false);
        setCipherOutput(output);
      }
    }
  };

  const handleDecipher = (e) => {
    e.preventDefault();
    if (!checkKey(decipherKey)) return;
    else {
      let output = decipherHomophonic(decipherInput, decipherKey);
      if (output === "Brak znaków do zdeszyfrowania!") {
        setDecipherAlertText(output);
        setDecipherAlertShow(true);
      } else {
        setDecipherAlertShow(false);
        setDecipherOutput(output);
      }
    }
  };

  const formData = [
    {
      id: "Cipher",
      onSubmit: handleCipher,
      title: "Szyfrowanie",
      placeholder: "Podaj tekst do zaszyfrowania.",
      setInput: setCipherInput,
      button_text: "Szyfruj",
      key_name: "Klucz szyfrujący",
      alertValue: cipherAlertShow,
      outputValue: cipherOutput,
      outputText: "Tu pojawi się szyfrogram.",
      setOutput: setCipherOutput,
      checkKey: checkCipherKey,
      alertText: cipherAlertText,
    },
    {
      id: "Decipher",
      onSubmit: handleDecipher,
      title: "Deszyfrowanie",
      placeholder: "Podaj tekst do zdeszyfrowania.",
      setInput: setDecipherInput,
      button_text: "Deszyfruj",
      key_name: "Klucz deszyfrujący",
      alertValue: decipherAlertShow,
      outputValue: decipherOutput,
      outputText: "Tu pojawi się zdeszyfrowany tekst.",
      setOutput: setDecipherOutput,
      checkKey: checkDecipherKey,
      alertText: decipherAlertText,
    },
  ];

  return formData.map((item) => {
    return (
      <div>
        <div className="outer-div-cipher">
          <form className="div-cipher" onSubmit={item.onSubmit}>
            <div className="div-title">{item.title}</div>
            <div className="main-section">
              <textarea
                className="cipher-input-output"
                type="text"
                placeholder={item.placeholder}
                onChange={(e) => {
                  item.setInput(e.target.value);
                  item.setOutput(item.outputText);
                }}
              ></textarea>
              <div className="middle-section homophonic-middle">
                <button className="button-cipher" type="submit">
                  {item.button_text}
                </button>
                <div className="div-key">
                  <label className="key-label">{item.key_name}</label>
                  <textarea
                    className="cipher-input-output homophonic-key"
                    onChange={(e) => {
                      item.checkKey(e.target.value);
                      item.setOutput(item.outputText);
                    }}
                  ></textarea>
                </div>
                <div className="button-div">
                  <button type="button" className="generate-key">
                    Generuj klucz
                  </button>
                </div>
              </div>
              <div className="cipher-input-output">{item.outputValue}</div>
            </div>
          </form>
        </div>
        <div className="polybius-error-div">
          {item.alertValue ? (
            <span className="key-error">{item.alertText}</span>
          ) : (
            <div className="key-error">&nbsp;</div>
          )}
        </div>
      </div>
    );
  });
}
