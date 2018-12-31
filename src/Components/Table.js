import React, { Component } from 'react'
import axios from 'axios';

export default class TableWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      weatherState: {},
      bulkWeather: []
    }
  }

  componentWillMount = () => {
    let { searchCity } = this.props
    let city = searchCity
    let API_KEY =  '6148faff9108a7d1f74a9a332767fbfd';
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    let bulk_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

    axios.get(URL)
      .then(res => {
        let {visibility, main, wind, name,weather} = res.data
        let {temp_min, temp_max, humidity, temp} = main
        let weatherState = {'visibility': visibility, 'windSpeed': wind.speed, 'name': name, 'weather': weather[0].main, 'min': temp_min, 'max': temp_max, 'temp': temp, 'humidity': humidity}
        
        this.setState({weatherState})
     })

     axios.get(bulk_URL)
     .then(res => {
       let result = res.data.list.map(x => {
          return {'Date': x.dt_txt, 'Day': new Date(x.dt_txt).getDay(), 'minTemp': x.main.temp_min, 'maxTemp': x.main.temp_max}
       })
       let resultNew = result.filter(x => {
         let hour = x.Date.split(' ')[1]
         if(hour.includes('15')){
           return true
         } else{
           return false
        }
      })
       let bulkWeather = resultNew
       this.setState({bulkWeather})
     })
  }

  render(){
    const days = (this.state.bulkWeather.map(x => {
      return (
        <td class="widthTh">{getDay[x.Day]}</td>
      )
    }))
    const temps = (this.state.bulkWeather.map(x => {
      return (
        <td class="widthTd"><div class="gridA"><div class="leftA">{displayTemp(x.minTemp)}°</div><div class="rightA">{displayTemp(x.maxTemp)}°</div></div></td>
      )
    }))
    
    return (
      <div className="cardTempo grid">
        <h3 className="cardTempo__h3">{this.state.weatherState.weather.name}</h3>
        <div className="cardTempo__X">X</div>
        <h2 className="cardTempo__h2 text_left">{displayTemp(this.state.weatherState.weather.temp)}°C {this.state.weatherState.weather.weather}</h2>
        <section className="gridCard">
          <div className="flex minmax text_left gridarea">
            <i class="fa fa-arrow-down arrow" aria-hidden="true"></i>
            <p className="min-max"><strong>{displayTemp(this.state.weatherState.weather.min)}°</strong></p>
            <i class="fa fa-arrow-up arrow" aria-hidden="true"></i>
            <p className="min-max "><strong>{displayTemp(this.state.weatherState.weather.max)}°</strong></p>
          </div>
          <div className="sensacao text_left gridarea">
            <p>Sensação <strong>{displayTemp(this.state.weatherState.weather.temp)}°</strong></p> 
          </div>
          <div className="vento text_left gridarea">
            <p>Vento <strong>{this.state.weatherState.weather.windSpeed}km/h</strong></p> 
          </div>
          <div className="humidade text_left gridarea">
            <p>Humidade <strong>{this.state.weatherState.weather.humidity}%</strong></p> 
          </div>
        </section>
        <hr></hr>
        <table class="table">
          <thead>
            <tr class="tr">
              {days}
            </tr>
          </thead>
          <tbody>
            <tr>
              {temps}
            </tr>
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="input-box" placeholder="Insira aqui o nome da cidade" name="textAr" value={this.state.searchCity} onChange={this.handleChange}/>
          <i className="fas fa-search search-icon" onClick={this.handleSubmit}></i>
        </form> 
      </div>
      )
    }
  }


const getDay = {
  0: 'Domingo',
  1: 'Segunda',
  2: 'Terça',
  3: 'Quarta',
  4: 'Quinta',
  5: 'Sexta',
  6: 'Sábado'
}
const displayTemp = (temp) => {
  let tempC = Math.round(temp).toFixed(0)
  return tempC;
}

