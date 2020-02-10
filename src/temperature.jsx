import React from 'react';

export function TemperatureDisplay(props) {
    return (
        <div id="tempDisplay">
            
            <div id="currentTemp">
                <div className="bigTemp">
                    {Math.round(props.weather.current)}°
                </div>
                <div className="smallTemp">
                    Feels like {Math.round(props.weather.feelsLike)}°
                </div>
            </div>
           
            
        </div>
    )
}