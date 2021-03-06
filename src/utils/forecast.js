const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/abc6015ae32274d1310b991f499a941a/${latitude},${longitude}?units=si`
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            const {temperature, precipProbability} = body.currently
            const dailyWeather = body.daily
            callback(undefined, `${dailyWeather.data[0].summary}
                It is currently ${temperature} ⁰C out.
                The high today is ${body.daily.data[0].temperatureHigh} ⁰C,
                with a low of ${body.daily.data[0].temperatureLow} ⁰C.
                There is a ${precipProbability} % chance of rain.`)
        }
    })
}

module.exports = forecast