import React, { Component } from 'react';
import { UnitSwitch } from './unitSwitch.jsx'
import { colorCoder } from './colorCode'
import { TemperatureDisplay } from './temperature';
import { WindDisplay } from './wind';
import { Location } from './location'
import { HiLo } from './HiLo';



let apiKey = "d8ca43a4a9423ed8bf08fa2a87f4727a"

let unitSelection = ['imperial','metric','kelvin']

export class App extends Component{
    state = {
        units: "f",
        placeName: '-',
        location: {
            lat: 0,
            long: 0
        },
        weather: {

        }

    }
    setColorCode = () => {
        
        if (this.state.units === 'c') {
            return (this.state.weather.feelsLike * (9 / 5) + 32);
        } else if (this.state.units === 'k') {
            return (this.state.weather.feelsLike * (9 / 5) - 459.67);
        } else {
            return this.state.weather.feelsLike;
        }
    }
    unitSelector = (unitIn) => {
        this.setState({ units:unitIn},this.getWeather)
    }
    initState = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.setState({
                message: "Thanks for granting location access!",
                location: {
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude
                }
            }, this.getWeather);
        },
            (resolve) => {
                this.setState({
                    message: "Accept location information access for accurate personal information",
                    location: {
                        lat: 42.3250896,
                        long: -72.6412013
                    }
                }
                
                    , this.getWeather);
            }
        )}   
        searchLogic(term) {
        

            if (term) {
                if (Number.parseInt(term) ? true : false) {
                return "zip"
                } else {return "name"}
            } else {return 'coord'}
        }
    weatherApiSwitch(input) {
        let unit = (this.state.units==='f'?"imperial":this.state.units==="c"?"metric":"kelvin")
        let innerBit;
        switch (input) {
            case "zip":
                innerBit = `zip=${this.state.input},us`
                break;
            case "name":
                innerBit = `q=${this.state.input}`
                break;
            default:
                innerBit = `lat=${this.state.location.lat}&lon=${this.state.location.long}`
                break;
        }
        return `https://api.openweathermap.org/data/2.5/weather?units=${unit}&${innerBit}&APPID=${apiKey}`
    }
    assignColor = ()=>{
        let tempClass = colorCoder(this.state.colorCode);
        this.setState({ tempClass: tempClass });
    }
    getWeather = (input) => {
        
        let inputType = this.searchLogic(input);
        let apiCall = this.weatherApiSwitch(inputType);
        fetch(apiCall,{mode:'cors'})
            .then((results) => results.json())
            .then((weather) => {
                console.log(weather)
                this.setState({
                    location: {
                        lat: weather.coord.lat,
                        long: weather.coord.lon
                    },
                    placeName: weather.name,
                    weather: {
                        current: weather.main.temp,
                        feelsLike: weather.main.feels_like,
                        hi: weather.main.temp_max,
                        lo: weather.main.temp_min,
                        windSpeed: weather.wind.speed,
                        windDir: weather.wind.deg

                    }
                })
            }).then(() => {
                let colorCode = this.setColorCode();
                this.setState({ colorCode: colorCode }, this.assignColor)
            })
            .catch((e) => { console.log(e) })
    }
    
    handleChange=(val)=> {
        this.setState({ input: val.target.value })
    }
   
    componentDidMount() {
        this.initState()
    
    }
    
    render() {

        if (this.state.placeName === "-") {
            return (
                <div id="appDisplay">
                    <h1>LOADING<span className="flashing">...</span></h1>
                </div>
            )
        } else {
            return (
                
                <div id="appDisplay" className={this.state.tempClass}>
                    
                    <div id="topInfo">
                        <div id="leftInfo">
                        
                        <Location place={this.state.placeName} />
                            <HiLo weather={this.state.weather} speedUnit={this.state.units === 'f' ? 'MPH' : 'KPH'}/>
                        </div>
                        <div id="rightInfo">
                        <TemperatureDisplay weather={this.state.weather}/>
                        </div>
                        
                    </div>
                   <div id="bottomInfo">
                        <div>
                            <input placeholder="Enter city or Zip" onChange={this.handleChange} onKeyDown={(e) => { if (e.keyCode === 13) { this.getWeather(this.state.input) } }}></input>
                            <button onClick={()=>{this.getWeather(this.state.input)}}>Search</button>
                        </div>
                        <UnitSwitch currentUnit={this.state.units} func={this.unitSelector} />
                        </div>
                </div>
            )
        }
    }   
}

