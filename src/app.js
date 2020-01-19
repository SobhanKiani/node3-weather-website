const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')



const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to save
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:"Sobhan"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'about me',
        name:'Sobhan Kiani'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:'This is just a help',
        name:"Sobhan"
    })
})


app.get("/weather",(req,res)=>{
    if(req.query.address){
        geocode("Boston",(error,{location,longitude,latitude}={})=>{
            if(error){
                return res.send({
                    error:error
                })
            }
        
            
            
            forecast(latitude, longitude, (error, forecastData={}) => {
                if(error){
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    forecastData:forecastData,
                    address:req.query.address,
                    location:location
                })
              })
        })
    }else{
        return res.send({
            error:'Address should be provided'
        })
    } 
})



    

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error:'You must provide a search term'
        })
    }else{
        console.log(req.query)
        res.send({
            products:[]
        })
    }

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sobhan',   
        error:"Help article couldnt be found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:"page not found",
        name:'Sobhan'
    })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})
