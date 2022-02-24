const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=de57d05a0972cbc7a48a83e950373dd2/' + latitude + ',' + longitude  

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connet weather app service ', undefined)
        } else if (body.error) {
            callback('unable to  find location', undefined)
        } else {
            // console.log(body.current.weather_descriptions[0])
            callback(
                undefined, 
                body.current.weather_descriptions[0] + ". its currently " + body.current.temperature + " degress out. it feels like " + body.current.feelslike + " deggres out. the humidity is " + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast