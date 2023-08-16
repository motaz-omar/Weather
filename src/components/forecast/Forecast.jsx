import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import styles from "../../assets/styles/forecast.module.css";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function Forecast({ data }) {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label id={styles.title}>Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className={styles["daily-item"]}>
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      className={styles["icon-small"]}
                      alt="weather"
                    />
                    <label className={styles.day}>{forecastDays[idx]}</label>
                    <label className={styles.description}>
                      {item.weather[0].description}
                    </label>
                    <label className={styles["min-max"]}>
                      {Math.round(item.main.temp_max)}°C /
                      {Math.round(item.main.temp_min)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className={styles["daily-details-grid"]}>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Pressure:</label>
                    <label>{item.main.pressure}</label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Humidity:</label>
                    <label>{item.main.humidity}</label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Sea level:</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                  <div className={styles["daily-details-grid-item"]}>
                    <label>Feels like:</label>
                    <label>{item.main.feels_like}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}

export default Forecast;
