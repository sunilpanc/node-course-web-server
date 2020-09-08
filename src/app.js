const path = require('path');
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
//Define path for express config
const publicPath = path.join(__dirname,'../public/');
const viewPath = path.join(__dirname,'../template/views');
const partialPath = path.join(__dirname,'../template/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Home page',
        name:'Sunil Panchal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About us',
        name:'Sunil Panchal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Sunil panchal'
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
    title:'404',
    message:'Help article not found!',
    name:'Sunil Panchal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'No address'
        })
    }
    console.log(req.query.address);
    location=req.query.address;
    geocode(location,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({error});
        }
        forecast(latitude,longitude, (error, forecastData) => {
          if (error){
            return res.send({error})
          }
          console.log(location);
          console.log(forecastData);
          res.send({
            forecast: forecastData,
            location:location,
            address: req.query.address
            })
        })
    })
    

})



app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'404 page not found',
        name:'Sunil Panchal'
    })
})

app.listen(4000,()=>{
    console.log('Server is up on port 4000.');
})