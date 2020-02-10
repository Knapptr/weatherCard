import React from 'react';

export function WindDisplay(props) {
    return (
        <div id="windInfo">
            {props.windSpeed} {props.speedUnit}
    </div>
    )
}