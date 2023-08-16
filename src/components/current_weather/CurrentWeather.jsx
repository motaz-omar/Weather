import React from "react";
import styles from "../../assets/styles/current-weather.module.css";

const CurrentWeather = ({ data }) => {
  return (
    <div id={styles.weather}>
      <div id={styles.top}>
        <div>
          <p id={styles.city}>{data.city}</p>
          <p id={styles["weather-description"]}>
            {data.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          id={styles["weather-icon"]}
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div id={styles.bottom}>
        <p id={styles.temperature}>{Math.round(data.main.temp)}°C</p>
        <div id={styles.details}>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Details</span>
          </div>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Feels like</span>
            <span className={styles["parameter-value"]}>
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Wind</span>
            <span className={styles["parameter-value"]}>
              {data.wind.speed} m/s
            </span>
          </div>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Humidity</span>
            <span className={styles["parameter-value"]}>
              {data.main.humidity}%
            </span>
          </div>
          <div className={styles["parameter-row"]}>
            <span className={styles["parameter-label"]}>Pressure</span>
            <span className={styles["parameter-value"]}>
              {data.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
