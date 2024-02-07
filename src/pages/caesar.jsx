import { useState } from "react";
import { cipherCaesar, checkKey } from "../cipher_algorithms/cipher_caesar";

export default function Caesar() {
  const [keyCipher, setCipherKey] = useState("");
  const [keyDecipher, setDecipherKey] = useState("");

  const [alertCipherShow, setCipherAlertShow] = useState(false);
  const [alertDecipherShow, setDecipherAlertShow] = useState(false);

  const [inputCipher, setCipherInput] = useState("");
  const [inputDecipher, setDecipherInput] = useState("");

  const [outputCipher, setCipherOutput] = useState("Tu pojawi się szyfrogram.");
  const [outputDecipher, setDecipherOutput] = useState(
    "Tu pojawi się zdeszyfrowany tekst."
  );

  const [alertCipherText, setCipherAlertText] = useState(false);
  const [alertDecipherText, setDecipherAlertText] = useState(false);

  function checkCipherKey(key) {
    if(key.startsWith('0')){
      key = key.slice(1);
    }
    if (!checkKey(key)) {
      setCipherAlertText('Zły klucz szyfrujący!');
      setCipherAlertShow(true);
      setCipherKey(key);
    } else {
      setCipherAlertShow(false);
      setCipherKey(key);
    }
  }

  function checkDecipherKey(key) {
    if(key.startsWith('0')){
      key = key.slice(1);
    }
    if (!checkKey(key)) {
      setDecipherAlertText('Zły klucz deszyfrujący!');
      setDecipherAlertShow(true);
      setDecipherKey(key);
    } else {
      setDecipherAlertShow(false);
      setDecipherKey(key);
    }
  }

  const handleCipher = (e) => {
    e.preventDefault();
    if (!checkKey(keyCipher)) return;
    else {
      let output = cipherCaesar(inputCipher, keyCipher, 1)
      if (output === "Brak znaków do zaszyfrowania!"){
        setCipherAlertText(output);
        setCipherAlertShow(true);
      }
      else {
        setCipherAlertShow(false);
        setCipherOutput(output);
      }
    }
  };

  const handleDecipher = (e) => {
    e.preventDefault();
    e.preventDefault();
    if (!checkKey(keyDecipher)) return;
    else {
      let output = cipherCaesar(inputDecipher, keyDecipher, -1)
      if (output === "Brak znaków do zdeszyfrowania!"){
        setDecipherAlertText(output);
        setDecipherAlertShow(true);
      }
      else {
        setDecipherAlertShow(false);
        setDecipherOutput(output);
      }
    }
  };

  const formData = [
    {
      id: 'cipher',
      title: "Szyfrowanie",
      placeholder: "Podaj tekst do zaszyfrowania.",
      button_text: "Szyfruj",
      key_name: "Klucz szyfrujący",
      keyCipherValue: keyCipher,
      checkKey: checkCipherKey,
      alertValue: alertCipherShow,
      onSubmit: handleCipher,
      outputValue: outputCipher,
      setInput: setCipherInput,
      outputText: "Tu pojawi się szyfrogram.",
      setOutput: setCipherOutput,
      alertText: alertCipherText,
      keyValue: keyCipher,
    },
    {
      id: 'decipher',
      title: "Deszyfrowanie",
      placeholder: "Podaj tekst do zdeszyfrowania.",
      button_text: "Deszyfruj",
      key_name: "Klucz deszyfrujący",
      keyCipherValue: keyDecipher,
      checkKey: checkDecipherKey,
      alertValue: alertDecipherShow,
      onSubmit: handleDecipher,
      outputValue: outputDecipher,
      setInput: setDecipherInput,
      outputText: "Tu pojawi się zdeszyfrowany tekst.",
      setOutput: setDecipherOutput,
      alertText: alertDecipherText,
      keyValue: keyDecipher,
    },
  ];
  return formData.map((item) => {
    return (
      <div className="outer-div-cipher" key={item.id}>
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
                <input
                  className="key-input"
                  value={item.keyValue}
                  onChange={(e) => {
                    item.checkKey(e.target.value.replace(/[^0-9]/g, ""));
                    item.setOutput(item.outputText);
                  }}
                />
                {item.alertValue ? (
                  <span className="key-error">{item.alertText}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="cipher-input-output"><div className="output-div">{item.outputValue}</div></div>
          </div>
        </form>
      </div>
    );
  });
}
