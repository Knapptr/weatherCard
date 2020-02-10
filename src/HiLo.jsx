import React from 'react'

function direction(angle) {
    const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
    return directions[Math.round(angle / 45) % 8];
}

export function HiLo(props) {
    return (
        <div id="subInfo">
        <div id="hiLo">
            <div id="hi">
                Hi: {Math.round(props.weather.hi)}°
            </div>
            <div id="lo">
                Lo: {Math.round(props.weather.lo)}°
            </div>
            </div>
            <div id="windInfo">
                <div id="windSpeed">
                    Wind: {props.weather.windSpeed} {props.speedUnit}
                    
                </div>
                <div id="windDir">
                    {props.weather.windDir ? `From the ${direction(props.weather.windDir)}` : undefined}
                </div>
            </div>
        </div>
    )
}