import "./current-weather.css"


const CurrentWeather = ({data}) => {
    return (
        <div className="weather">
            <div class="cardContainer">
                <div class="card">
                    <p class="city">{data.city}</p>
                    <p class="weather-description">{(data.weather[0].description).toUpperCase()}</p>
                    <img alt="weather" className="weather-icon" src={`/Weather-App/icons/${data.weather[0].icon}.png`} />
                    <p class="temperature">{Math.round(data.main.temp)}°C</p>
                    <div className="feelsLikeContainer">
                        <span className="feelsLikeHeading">Feels like:</span>
                        <span className="feelsLikeTemp">{Math.round(data.main.feels_like)}°C</span>
                    </div>
                    <div class="minmaxContainer">
                        <div class="min">
                            <p class="minHeading">Min</p>
                            <p class="minTemp">{Math.round(data.main.temp_min)}°C</p>
                        </div>
                        <div class="max"><p class="maxHeading">Max</p>
                            <p class="maxTemp">{Math.round(data.main.temp_max)}°C</p>
                         </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;