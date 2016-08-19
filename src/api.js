var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=b9b764974fcd990cadb1605e9fb20e53';

var kelvinToF = function(kelvin){
  return Math.round((kelvin-273.15) * 1.8 + 32) + ' ˚F'
}

module.exports = function(latitude, longitude){
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      return {
        city: json.name,
        temperature: kelvinToF(json.main.temp),
        description: json.weather[0].description
      }
    })
    .catch(function(error){
      console.log('the error', error)
    })
}
