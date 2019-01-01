import React from 'react'

const CapitalWeather = ({ citiesWeather }) => {
  const cities = (citiesWeather.map((x,index) => {
    if(index % 2 === 0 ){
      return (
          <tr key={index}>
            <td className="capitais__th bold">{displayTemp(x.main.temp_min)}</td>
            <td className="capitais__th bold">{displayTemp(x.main.temp_max)}</td>
            <td className="capitais__th bold">{x.name}</td>
          </tr>
        )
      }
      else{
        return null
      }
  }))
  const citiesRemaining = (citiesWeather.map((x,index) => {
    if(index % 2 !== 0 ){
      return (
          <tr key={index}>
            <td className="capitais__th bold">{displayTemp(x.main.temp_min)}</td>
            <td className="capitais__th bold">{displayTemp(x.main.temp_max)}</td>
            <td className="capitais__th bold">{x.name}</td>
          </tr>
        )
      }else{
        return null
      }
  }))

  return (
    <div className="capitaisDiv">
      <h2 className="capitais">Capitais</h2>
      <div className="flex">
        <table className="tableOne">
          <thead>
            <tr>
              <th className="capitais__th">Min</th>
              <th className="capitais__th">Max</th>
              <th className="capitais__th blank"></th>
            </tr>
          </thead>
          <tbody>{cities}</tbody>
        </table>
        <table className="tableOne">
          <thead>
            <tr>
              <th className="capitais__th">Min</th>
              <th className="capitais__th">Max</th>
              <th className="capitais__th blank"></th>
            </tr>
          </thead>
          <tbody>{citiesRemaining}</tbody>
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