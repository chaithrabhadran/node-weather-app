const request = require("request");

const forecast=(lat,lng,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=46027e5199ccb2a0dd9ab992788cec14&query=${lat},${lng}`;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!')
        }else if(body.error){
            // console.log(response.body);
            callback('Unable to find location')
        }else{
            callback(undefined,`${body.current.weather_descriptions[0]}.. It is ${body.current.temperature} degrees outside. It feels like ${body.current.feelslike} out. The humidity is ${body.current.humidity}% .`)
        }
    })
}

module.exports=forecast;