const request = require('request');

const geocode=(address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VuaWxwYW5jIiwiYSI6ImNrY204ODh0bjAwb3YycnJ1ejY4bGlleTcifQ.-t72l2uILEKfs5PEfwjiXA`;

    request({url,json:true},(error, { body })=>{

        if(error){
            callback('Unable to connect. Please check your internet connection',undefined);
        }
        else if(body.features.length===0){
            callback('Please enter valid address. Try another one!', undefined);
        }
        else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            });
        }
        })
    }


// geocode('amazon',(error,data)=>{
//     console.log('Error',error)
//     console.log('Data',data)
// })





module.exports = geocode;