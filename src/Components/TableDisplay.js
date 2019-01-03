import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

const TableDisplay = ({bulkWeather, weatherState}) => {
  if(bulkWeather.length !== 0){
    const days = (bulkWeather.map(x => {
      return (
        <td class="widthTh">{getDay[x.Day]}</td>
      )
    }))
    const temps = (bulkWeather.map(x => {
      return (
        <td class="widthTd"><div class="gridA"><div class="leftA">{displayTemp(x.minTemp)}°</div><div class="rightA">{displayTemp(x.maxTemp)}°</div></div></td>
      )
    }))      
    
    return (
      <CSSTransitionGroup
      transitionName="example"
      transitionAppear={true}
      transitionAppearTimeout={400}
      transitionEnter={true}
      transitionLeave={false}>

      <div className="cardTempo grid">
        <h3 className="cardTempo__h3">{weatherState.name}</h3>
        <div className="cardTempo__X">X</div>
        <h2 className="cardTempo__h2 text_left">{displayTemp(weatherState.temp)}°C {getWeather[weatherState.weather]}</h2>
        <section className="gridCard">
          <div className="flex minmax text_left gridarea">
            <i class="fa fa-arrow-down arrow" aria-hidden="true"></i>
            <p className="min-max"><strong>{displayTemp(weatherState.min)}°</strong></p>
            <i class="fa fa-arrow-up arrow" aria-hidden="true"></i>
            <p className="min-max "><strong>{displayTemp(weatherState.max)}°</strong></p>
          </div>
          <div className="sensacao text_left gridarea">
            <p>Sensação <strong>{displayTemp(weatherState.temp)}°</strong></p> 
          </div>
          <div className="vento text_left gridarea">
            <p>Vento <strong>{weatherState.windSpeed}km/h</strong></p> 
          </div>
          <div className="humidade text_left gridarea">
            <p>Humidade <strong>{weatherState.humidity}%</strong></p> 
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
      </div>
      </CSSTransitionGroup>
    )
  }else{
    return (
      <div></div>
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

const getWeather = {
  'Clouds': 'Nublado'
}
const displayTemp = (temp) => {
  let tempC = Math.round(temp).toFixed(0)
  return tempC;
}

export default TableDisplay
