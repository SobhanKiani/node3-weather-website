const request = require('request')


const forecast = (latitude,longtitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/57fc636cef3a896118b5fe888ac06aee/'+latitude+","+longtitude
    request({url,json:true},(error,{body}={})=>{
        
        
        if(error){
            callback('Low level error',undefined)
        }else if(body.error){
            callback("Coordinate error",undefined)
        }else{
            callback(undefined, "It is currently "+body.currently.temperature+
            "This high is today is "+body.daily.data[0].tempratureHigh+" with a low of "+body.daily.data[0].tempratureLow+
                ". degrees out. There is a "+body.currently.precipProbability+"% chance of the rain" )
        }
    })
}




module.exports = forecast