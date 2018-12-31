import React, { Component } from 'react';
import axios from 'axios';
import TableWeather from './Table'
import CapitalWeather from './CapitalWeather'
import { Promise } from 'q';

export default class Search extends Component {
  state = {
    searchCity: '',
    weatherState: {},
    bulkWeather: [],
    citiesWeather: [],
    cities: ['rio de janeiro', 'sao paulo', 'belo horizonte', 'brasilia', 'belem', 'salvador', 'curitiba', 'fortaleza', 'manaus', 'joao pessoa']
  }

  // handleChange(event) {
  //   let a = event.target.value
  //   console.log(a)
  //   alert(a)
  //   // this.setState((event) => {
  //   //   return {searchCity: event.target.value}
  //   // })     
  // }
  handleSubmit(event) {
    console.log(event)
    event.preventDefault()
    let city = this.state.searchCity
    let API_KEY =  '6148faff9108a7d1f74a9a332767fbfd';
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    let bulk_URL = `http://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}&units=metric`

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

  componentDidMount = () => {
    let API_KEY =  '6148faff9108a7d1f74a9a332767fbfd';
    let { cities } = this.state
    let promises = cities.map(city => {
      city = city.replace(' ', '%20')
      let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      return axios.get(URL)
    })
    Promise.all(promises)
    .then(values => {
      console.log(`this is ${values} ${Object.keys(values)}`)
      let citiesWeather = values.map(x => x.data)
      this.setState({citiesWeather})
    })
  }

  render() {
    return (
      <div className="tempo">
        <h1 class="tempo__h1">Previsão do tempo</h1>
        <br></br>
        <TableWeather weather={this.state.weatherState} bulkWeather={this.state.bulkWeather}/>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="input-box" placeholder="Insira aqui o nome da cidade" name="textAr" />
          <i className="fas fa-search search-icon"></i>
          <input type="submit"></input>
        </form>
        <hr class="mainHr"></hr>
        <CapitalWeather citiesWeather={this.state.citiesWeather} />
      </div>
    )
  }
}
