import React from 'react';

let unitOptions = ["f", "c", "k"];



export let UnitSwitch = (props) => {
    
    return (
        <div id="appHeader">
            <div id="unitSelector">
            
            {unitOptions.map((unit) => {
                return <div className={`unit ${unit===props.currentUnit?"selected":null}`} key={unit} id={`${unit}Selector`} onClick={()=>{props.func(unit)}}>{unit}</div>
            })}
            
                
            
                {/* <input type="radio" id="kSwitch" name="unit" onChange={() => { props.func('k') }}></input> */}
            
            </div>
        </div>
        
    );
}