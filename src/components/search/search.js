import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import "../../App.css";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const predefinedCities = [
        {
            name: "Toronto",
            latitude: 43.669,
            longitude: -79.3916,
            countryCode: "CA"
        },
        {
            name: "New York",
            latitude: 40.7128,
            longitude: -74.0060,
            countryCode: "US",
        },
        {
            name: "Seattle",
            latitude: 47.6062,
            longitude: -122.3321,
            countryCode: "US"
        },
        {
            name: "London",
            latitude: 51.5074,
            longitude: -0.1278,
            countryCode: "GB",
        },
        {
            name: "Dubai",
            latitude: 25.2697,
            longitude: 55.3094,
            countryCode: "AE"
        }
    ];

    const mapCityToOption = (city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
    });

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}?minPopulation=500000&namePrefix=${inputValue}`,
            geoApiOptions)
            .then((response) => response.json())
            .then((response) => {
                const predefinedOptions = predefinedCities.map(mapCityToOption);;
                if (!inputValue) {
                    return {
                        options: predefinedOptions,
                    };
                }

                const fetchedOptions = response.data.map(mapCityToOption);
                return {
                    options: fetchedOptions,
                    hasMore: response.hasMorePages,
                };
            });
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <div className="container">
            <AsyncPaginate
                className="select"
                placeholder="Search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            />
        </div>
    )
}

export default Search;