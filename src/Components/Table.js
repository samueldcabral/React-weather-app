import React, { Component } from 'react'
import axios from 'axios';
import TableDisplay from './TableDisplay'

export default class TableWeather extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchCity: '',
      weatherState: {},
      bulkWeather: []
    }
  }

  handleChange = (e) => {
    // this.setState = ((state, e) => {
    //   return {
    //     searchCity: e.target.value
    //   }
    // })
    this.setState({searchCity: e.target.value})
    // alert(e.target.value)
    // this.setState({searchCity: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let city = this.state.searchCity
    let API_KEY =  '6148faff9108a7d1f74a9a332767fbfd';
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    let bulk_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

    axios.get(URL)
      .then(res => {
        let {visibility, main, wind, name, weather} = res.data
        let {temp_min, temp_max, humidity, temp} = main
        let weatherState = {'visibility': visibility, 'windSpeed': wind.speed, 'name': name, 'weather': weather[0].main, 'min': temp_min, 'max': temp_max, 'temp': temp, 'humidity': humidity}
        
        // this.setState = (() => {
        //   return {
        //     weatherState: weatherState
        //   }
        // })
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
      //  this.setState = ((state) => {
      //    return {
      //      bulkWeather
      //    }
      //  })
       this.setState({bulkWeather})
     })

     this.setState({searchCity: ''})
  }
  // componentDidMount(){
  //   let { searchCity } = this.props
  //   let city = searchCity
  //   let API_KEY =  '6148faff9108a7d1f74a9a332767fbfd';
  //   let URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  //   let bulk_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

  //   axios.get(URL)
  //     .then(res => {
  //       let {visibility, main, wind, name,weather} = res.data
  //       let {temp_min, temp_max, humidity, temp} = main
  //       let weatherState = {'visibility': visibility, 'windSpeed': wind.speed, 'name': name, 'weather': weather[0].main, 'min': temp_min, 'max': temp_max, 'temp': temp, 'humidity': humidity}
        
  //       this.setState({weatherState})
  //    })

  //    axios.get(bulk_URL)
  //    .then(res => {
  //      let result = res.data.list.map(x => {
  //         return {'Date': x.dt_txt, 'Day': new Date(x.dt_txt).getDay(), 'minTemp': x.main.temp_min, 'maxTemp': x.main.temp_max}
  //      })
  //      let resultNew = result.filter(x => {
  //        let hour = x.Date.split(' ')[1]
  //        if(hour.includes('15')){
  //          return true
  //        } else{
  //          return false
  //       }
  //     })
  //      let bulkWeather = resultNew
  //      this.setState({bulkWeather})
  //    })
  // }
  
  render(){
    // const bulkWeather = this.state.bulkWeather
    // let TableDisplay;
    // if(bulkWeather) {
    //   TableDisplay = <TableDisplay bulkWeather={this.state.bulkWeather} weatherState={this.state.weatherState}/>
    // }else{
    //   // TableDisplay = <div>nothing to see here</div>
    //   TableDisplay = <TableDisplay bulkWeather={this.state.bulkWeather} weatherState={this.state.weatherState}/>
    // }

    return (
      <div>      
        <TableDisplay bulkWeather={this.state.bulkWeather} weatherState={this.state.weatherState}/>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="input-box" placeholder="Insira aqui o nome da cidade" name="textAr" value={this.state.searchCity} onChange={this.handleChange}/>
          <i className="fas fa-search search-icon" onClick={this.handleSubmit}></i>
        </form> 
      </div>
    )
  }
}


// const getDay = {
//   0: 'Domingo',
//   1: 'Segunda',
//   2: 'Terça',
//   3: 'Quarta',
//   4: 'Quinta',
//   5: 'Sexta',
//   6: 'Sábado'
// }
// const displayTemp = (temp) => {
//   let tempC = Math.round(temp).toFixed(0)
//   return tempC;
// }