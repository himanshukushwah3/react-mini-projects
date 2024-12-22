import React, { useEffect, useState } from "react";
import style from "./weatther.module.css";

import { FaArrowDown, FaSearch, FaWind, FaArrowUp } from "react-icons/fa";
import dataFetching from "./dataFetching";

const Weather = () => {
  const [search, setSearch] = useState("Delhi");
  const [weather, setWeather] = useState();
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchData = async () => {
      const result = await dataFetching(search, units);
      console.log(result);
      setWeather(result);
    };
    fetchData();
  }, [search, units]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(event.target.city.value);
  };

  const handleChange = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric')
  }
  return (
    <div className={style.wrapper}>
      <div className={style.overlay}>
        <div className={style.container}>
          <div className={`${style.input_section} ${style.section}`}>
            <form onSubmit={handleSubmit} className={style.form_section}>
              <input type="text" name="city" placeholder="Enter City Name..." />
              <button type="submit" className={style.searchBtn}>
                <FaSearch />
              </button>
            </form>
            <button className={style.tempBtn} onClick={handleChange}>°{units === 'metric' ? 'C' : 'F'}</button>
          </div>
          {weather && (
            <>
              <div className={`${style.temp_section} ${style.section}`}>
                <div className={style.icon_section}>
                  <h3>
                    {weather.name}, {weather.country}
                  </h3>
                  <img src={weather.iconURL} alt="tempimage" />
                  <h3>{weather.description}</h3>
                </div>
                <div className={style.temp}>
                  <h1>{`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}</h1>
                </div>
              </div>
              <div className={`${style.desc_section} ${style.section}`}>
                <div className={style.card}>
                  <div className={style.desc_card}>
                    <FaArrowDown />
                    <small>min</small>
                  </div>
                  <h2>{`${weather.temp_min.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}</h2>
                </div>
                <div className={style.card}>
                  <div className={style.desc_card}>
                    <FaArrowUp />
                    <small>max</small>
                  </div>
                  <h2>{`${weather.temp_max.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}</h2>
                </div>
                <div className={style.card}>
                  <div className={style.desc_card}>
                    <FaWind />
                    <small>Wind</small>
                  </div>
                  <h2>{`${weather.speed.toFixed()} ${units === "metric" ? "m/s" : "m/h"}`}</h2>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
