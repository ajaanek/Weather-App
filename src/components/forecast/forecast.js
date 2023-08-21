import { Accordion, AccordionItemHeading, AccordionItem, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import React, { useState } from 'react';
import './forecast.css'

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    const [expanded, setExpanded] = useState(null);
    const handleItemClick = (index) => {
        if (expanded === index) {
            setExpanded(null);
        } else {
            setExpanded(index);
        }
    };

    return (
        <>
            <div className="container">
                <label className="title">7-Day Forecast</label>
                <div className="accordionContainer">
                    <Accordion allowZeroExpanded>
                        {data.list.splice(0, 7).map((item, idx) => (
                            <AccordionItem key={idx} className="horizontal-accordion-item">
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <div className="daily-item">
                                            <p className="day">{forecastDays[idx]}</p>
                                            <p className="description">{item.weather[0].description.toUpperCase()}</p>
                                            <img alt="weather" className="icon-small" src={`/Weather-App/icons/${item.weather[0].icon}.png`} />                                                    
                                            <div class="minmaxContainer">
                                                <div class="min">
                                                    <p class="minHeading">Min</p>
                                                    <p class="minTemp">{Math.round(item.main.temp_min)}°C</p>
                                                </div>
                                                <div class="max"><p class="maxHeading">Max</p>
                                                    <p class="maxTemp">{Math.round(item.main.temp_max)}°C</p>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="panel" style={expanded === idx ? { height: '0', overflow: 'hidden' } : { height: '145px' }}>
                                    <div className="daily-details-grid">
                                        <div className="daily-details-grid-item">
                                            <label>Feels Like</label>
                                            <label>{Math.round(item.main.feels_like)} °C</label>
                                        </div>
                                        <div className="daily-details-grid-item">
                                            <label>Wind Speed</label>
                                            <label>{item.wind.speed} m/s</label>
                                        </div>
                                        <div className="daily-details-grid-item">
                                            <label>Pressure</label>
                                            <label>{item.main.pressure} hPa</label>
                                        </div>
                                        <div className="daily-details-grid-item">
                                            <label>Humidity</label>
                                            <label>{item.main.humidity} %</label>
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
            
        </>
    )
}

export default Forecast;