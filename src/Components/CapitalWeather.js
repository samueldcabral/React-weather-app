import React from 'react'

const CapitalWeather = ({ citiesWeather }) => {
  const cities = (citiesWeather.map((x,index) => {
    if(index % 2 === 0 ){
      return (
          <tr>
            <td class="capitais__th bold">{displayTemp(x.main.temp_min)}</td>
            <td class="capitais__th bold">{displayTemp(x.main.temp_max)}</td>
            <td class="capitais__th bold">{x.name}</td>
          </tr>
        )
      }
  }))
  const citiesRemaining = (citiesWeather.map((x,index) => {
    if(index % 2 !== 0 ){
      return (
          <tr>
            <td class="capitais__th bold">{displayTemp(x.main.temp_min)}</td>
            <td class="capitais__th bold">{displayTemp(x.main.temp_max)}</td>
            <td class="capitais__th bold">{x.name}</td>
          </tr>
        )
      }
  }))

  return (
      <div class="capitaisDiv">
        <h2 class="capitais">Capitais</h2>
        <div className="flex">
          <table class="tableOne">
            <thead>
              <th class="capitais__th">Min</th>
              <th class="capitais__th">Max</th>
              <th class="capitais__th blank"></th>
            </thead>
            <tbody>
            {cities}  
            </tbody>
          </table>
          <table class="tableOne">
            <thead>
              <th class="capitais__th">Min</th>
              <th class="capitais__th">Max</th>
              <th class="capitais__th blank"></th>
            </thead>
            <tbody>
            {citiesRemaining}  
            </tbody>
          </table>
        </div>
      </div>
  )
}


const displayTemp = (temp) => {
  let tempC = Math.round(temp).toFixed(0)
  return tempC;
}

export default CapitalWeather