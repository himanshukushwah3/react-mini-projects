import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaVolumeUp, FaClone, FaExchangeAlt } from "react-icons/fa";
import "./style.css";
import useHandleChange from "./useHandleChange";

const Translator = () => {
  const [data, setData] = useState([]);
  const fromSelectedOption = useHandleChange("en");
  const toSelectedOption = useHandleChange("en");
  const fromInputText = useHandleChange("");
  const toInputText = useHandleChange("");

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // ? === Getting Languages ===
  useEffect(() => {
    axios
      .get("https://libretranslate.com/languages", {
        header: { accept: "application/json" },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ? === Swapping Function ===
  const handleSwap = () => {
    const temp1 = fromInputText.value;
    const temp2 = fromSelectedOption.value;
    fromInputText.onChange({ target: { value: toInputText.value } });
    toInputText.onChange({ target: { value: temp1 } });
    fromSelectedOption.onChange({ target: { value: toSelectedOption.value } });
    toSelectedOption.onChange({ target: { value: temp2 } });
  };

  // ? === Copy Function ===

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
    }
    if (outputRef.current) {
      outputRef.current.select();
      document.execCommand("copy");
    }
  };

  const handleSound = () => console.log('sound');

  // ? === Translate Function ===
  const translate = async () => {
    
    const encodedParams = new URLSearchParams();
    encodedParams.set("q", fromInputText.value);
    encodedParams.set("source", fromSelectedOption.value);
    encodedParams.set("target", toSelectedOption.value);

    await axios({
      method: "POST", 
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      data: encodedParams,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "f436e56cf6msheda4d2c32adfabdp1215ddjsn07d73b79f746",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
    })
      .then((res) =>
        toInputText.onChange({
          target: { value: res.data.data.translations[0].translatedText },
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="wrapper">
      <div className="section">
        <div className="main-form">
          <div className="upper-div">
            <div className="input-section input-div">
              <textarea
                className="formInput"
                placeholder=""
                name="from"
                value={fromInputText.value}
                onChange={fromInputText.onChange}
                ref={inputRef}
              ></textarea>
            </div>
            <div className="input-section output-div">
              <textarea
                className="formInput"
                name="to"
                placeholder="Translation..."
                value={toInputText.value}
                onChange={toInputText.onChange}
                ref={outputRef}
              ></textarea>
            </div>
          </div>
          <div className="option-div">
            <div>
              <span onClick={handleSound}>
                  <FaVolumeUp />
                </span>
              <span onClick={handleCopy}>
                <FaClone />
              </span>
            </div>
            <div>
              <select
                name="input"
                value={fromSelectedOption.value}
                onChange={fromSelectedOption.onChange}
              >
                {data.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="exchange-icon" onClick={handleSwap}>
                <FaExchangeAlt />
              </span>
              <select
                name="output"
                value={toSelectedOption.value}
                onChange={toSelectedOption.onChange}
              >
                {data.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span onClick={handleSound}>
                  <FaVolumeUp />
                </span>
              <span onClick={handleCopy}>
                <FaClone />
              </span>
            </div>
          </div>
          <button onClick={(e) => translate()}>Translate</button>
        </div>
      </div>
    </div>
  );
};

export default Translator;
