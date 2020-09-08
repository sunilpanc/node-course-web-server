const request = require('request')

const forecast = (lat,lon, callback)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c4d5f4a25bff70f6f880e19f16ca3f6`;

    request({url,json:true},(error,{ body })=>{

        if(error){
            callback('You are not connected with internet',undefined);
        }
        else if(body.message){
            callback('You entered invalid geocode. Please try another one...',undefined);
        }
        else{
            const temp = body.main.temp-273.15;
            callback(undefined,`${body.weather[0].description}. It is currently ${temp} degrees out. There is a ${body.clouds['all']}% chance of rain.`);
        }
    })
}


// forecast(27.2038,77.5011,(error,data)=>{
//     console.log('Error',error)
//     console.log('Data',data)
// })

module.exports = forecast;