import React, { useEffect, useState } from "react";
import style from "./gallery.module.css";
import { data } from "./imageData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Gallery = () => {
  const [item, setItem] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIncrement = () => {
    if (currentIndex < item.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < item.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);
    return () => clearInterval(interval)
  }, [currentIndex])


  const handleDecrement = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(item.length - 1);
    }
  };

  const handleRandom = () => {
    const randomValue = Math.floor(Math.random() * item.length);
    setCurrentIndex(randomValue);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.section}>
        {/* {item.map((temp, index) => (
          <div className={style.img_box} key={index}>
            <img className={style.image} src={temp.image} alt={data.image} />
          </div>
        ))} */}
        {currentIndex ? (
          <div className={style.img_box}>
            <img
              className={style.image}
              src={item[currentIndex].image}
              alt={item[currentIndex].id}
            />
          </div>
        ) : (
          <div className={style.img_box}>
            <img
              className={style.image}
              src={item[currentIndex].image}
              alt={item[currentIndex].id}
            />
          </div>
        )}
      </div>
      <div className={style.button}>
        <span className={style.leftarrow} onClick={handleDecrement}>
          <FaArrowLeft />
        </span>
        <button onClick={handleRandom}>Random Image</button>
        <span className={style.rightarrow} onClick={handleIncrement}>
          <FaArrowRight />
        </span>
      </div>
    </div>
  );
};

export default Gallery;
