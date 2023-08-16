import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import styles from "../../assets/styles/search-bar.module.css";
import { GEO_API_URL, geoApiOptions } from "../../api/geo_api";

function SearchBar({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  async function loadOptions(inputValue) {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();

      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.log(error);
    }
  }
  function onChangeHandler(searchData) {
    setSearch(searchData);
    onSearchChange(searchData);
  }
  return (
    <>
      <AsyncPaginate
        id={styles["search-bar"]}
        placeholder="search for city"
        debounceTimeout={600}
        value={search}
        onChange={onChangeHandler}
        loadOptions={loadOptions}
      />
    </>
  );
}

export default SearchBar;
