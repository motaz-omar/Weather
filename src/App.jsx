import SearchBar from "./components/search/SearchBar";
import CurrentWeather from "./components/current_weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api/weather_api";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

function App() {
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSearchChangeHandler(searchData) {
    const [lat, lon] = searchData.value.split(" ");

    try {
      setIsLoading(true);

      const currentWeatherResponse = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastResponse = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();

      // if (currentWeatherResponse.ok && forecastResponse.ok) {
      //   setCurrentWeather({ city: searchData.label, ...currentWeatherData });

      //   setForecast({ city: searchData.label, ...forecastData });
      // }

      if (!currentWeatherResponse.ok && !forecastResponse.ok) {
        throw new Error("something went wrong,couldn't fetch data");
      }
      setCurrentWeather({ city: searchData.label, ...currentWeatherData });

      setForecast({ city: searchData.label, ...forecastData });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <>
      <SearchBar onSearchChange={onSearchChangeHandler} />

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <CircularProgress size="5rem" />
        </Box>
      )}

      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {error && !isLoading && <h1>{error}</h1>}
    </>
  );
}

export default App;
