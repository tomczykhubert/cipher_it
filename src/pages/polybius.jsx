import { useState } from "react";
import KeyInput from "../Components/KeyInputPolybius.jsx";
import {
  checkKey,
  cipherPolybius,
  decipherPolybius,
} from "../cipher_algorithms/cipher_polybius";

export default function Polybius() {
  const [alertCipher, setCipherAlert] = useState(false);
  const [alertDecipher, setDecipherAlert] = useState(false);

  const [alertCipherText, setCipherAlertText] = useState("");
  const [alertDecipherText, setDecipherAlertText] = useState("");

  const [inputCipher, setCipherInput] = useState("");
  const [inputDecipher, setDecipherInput] = useState("");

  const [outputCipher, setCipherOutput] = useState("Tu pojawi się szyfrogram.");
  const [outputDecipher, setDecipherOutput] = useState(
    "Tu pojawi się zdeszyfrowany tekst."
  );

  const [primeCipher, setCipherPrime] = useState(false);
  const [primeDecipher, setDecipherPrime] = useState(false);

  const [keyCipher, setCipherKey] = useState(Array(5).fill(Array(7)));
  const [keyDecipher, setDecipherKey] = useState(Array(5).fill(Array(7)));

  function exportCipherKey(key) {
    setCipherOutput("Tu pojawi się szyfrogram.");
    checkCipherKey(key);
    setCipherKey(key);
  }
  function exportDecipherKey(key) {
    setDecipherOutput("Tu pojawi się zdeszyfrowany tekst.");
    checkDecipherKey(key);
    setDecipherKey(key);
  }

  function checkCipherKey(key) {
    if (!checkKey(key)) {
      setCipherAlertText("Zły klucz szyfrujący!");
      setCipherAlert(true);
      setCipherKey(key);
    } else {
      setCipherAlert(false);
      setCipherKey(key);
    }
  }

  function checkDecipherKey(key) {
    if (!checkKey(key)) {
      setDecipherAlertText("Zły klucz deszyfrujący!");
      setDecipherAlert(true);
      setDecipherKey(key);
    } else {
      setDecipherAlert(false);
      setDecipherKey(key);
    }
  }

  const handleCipher = (e) => {
    e.preventDefault();
    if (!checkKey(keyCipher)) {
      setCipherAlertText("Zły klucz szyfrujący!");
      setCipherAlert(true);
      return;
    } else {
      let output = cipherPolybius(inputCipher, keyCipher, primeCipher);
      if (output === "Brak znaków do zaszyfrowania!"){
        setCipherAlertText("Brak znaków do zaszyfrowania!");
        setCipherAlert(true);
      }
      else {
        setCipherAlert(false);
        setCipherOutput(output);
      }
    }
  };

  const handleDecipher = (e) => {
    e.preventDefault();
    if (!checkKey(keyDecipher)) {
      setDecipherAlertText("Zły klucz deszyfrujący!");
      setDecipherAlert(true);
      return;
    } else {
      let output = decipherPolybius(inputDecipher, keyDecipher, primeDecipher);
      if (output === "Nieprawidowy szyfrogram, wprowadź wyłącznie cyfry 1-7."){
        setDecipherAlertText("Nieprawidowy szyfrogram, wprowadź wyłącznie cyfry 1-7.");
        setDecipherAlert(true);
      }
      else if(output === "Nieprawidowy szyfrogram, wprowadź parzystą liczbe cyfr."){
        setDecipherAlertText("Nieprawidowy szyfrogram, wprowadź parzystą liczbe cyfr.");
        setDecipherAlert(true);
      }
      else {
        setCipherAlert(false);
        setDecipherOutput(output);
      }
    }
  };

  const formData = [
    {
      id: 'Cipher',
      onSubmit: handleCipher,
      title: "Szyfrowanie",
      placeholder: "Podaj tekst do zaszyfrowania.",
      setInput: setCipherInput,
      button_text: "Szyfruj",
      key_name: "Klucz szyfrujący",
      alertValue: alertCipher,
      outputValue: outputCipher,
      exportKey: exportCipherKey,
      outputText: "Tu pojawi się szyfrogram.",
      setOutput: setCipherOutput,
      checkKey: checkCipherKey,
      setPrime: setCipherPrime,
      primeValue: primeCipher,
      alertText: alertCipherText,
    },
    {
      id: 'Decipher',
      onSubmit: handleDecipher,
      title: "Deszyfrowanie",
      placeholder: "Podaj tekst do zdeszyfrowania.",
      setInput: setDecipherInput,
      button_text: "Deszyfruj",
      key_name: "Klucz deszyfrujący",
      alertValue: alertDecipher,
      outputValue: outputDecipher,
      exportKey: exportDecipherKey,
      outputText: "Tu pojawi się zdeszyfrowany tekst.",
      setOutput: setDecipherOutput,
      checkKey: checkDecipherKey,
      setPrime: setDecipherPrime,
      primeValue: primeDecipher,
      alertText: alertDecipherText,
    },
  ];

  return formData.map((item) => {
    return (
      <div key={item.id}>
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
              <div className="middle-section">
                <button className="button-cipher" type="submit">
                  {item.button_text}
                </button>
                <div className="div-key">
                  <label className="key-label">{item.key_name}</label>
                  <KeyInput exportKey={item.exportKey} />
                  <div className="checkbox-div">
                    <input
                      value={item.primeValue}
                      onChange={(e) => item.setPrime(e.target.checked)}
                      className="prime-checkbox"
                      type="checkbox"
                    ></input>
                    <label className="prime-label">
                      Zamiana cyfr miejscami
                    </label>
                  </div>
                </div>
              </div>
              <div className="cipher-input-output">{item.outputValue}</div>
            </div>
          </form>
        </div>
        <div className="polybius-error-div">
          {item.alertValue ? (
            <span className="key-error polybius-error">
             {item.alertText}
            </span>
          ) : (
            <div className="key-error polybius-error">&nbsp;</div>
          )}
        </div>
      </div>
    );
  });
}
