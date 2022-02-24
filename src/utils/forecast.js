const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://http://api.weatherstack.com/current?access_key=de57d05a0972cbc7a48a83e950373dd2/' + latitude + ',' + longitude  + 'unitsef'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unableto connetx weather app', undefined)
        } else if (body.error) {
            callback('unable to  find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + 'disini berasa seperti suhu ' + body.current.temperature + ' selsius dan rasanya seperti ' + body.current.feelslike)
        }
    })
}

module.exports = forecast