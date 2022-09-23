const express = require('express')
const mongoose = require('mongoose')
const movieSchema = require('./Model/MovieSchema')

const movieModel = mongoose.model('movies',movieSchema)


const app =express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/movieDb',{useNewUrlParser:true})

mongoose.connection.on('connected',()=>{
    console.log("connected to MongoDb")
})

app.get('/movies',async (req,res)=>{
    const movies =await  movieModel.find()
    res.status(200).send({
        message:"Heare are your movies my fried 😊 ",
        data:movies
    });
})

app.post('/movies',(req,res)=>{
    const body = req.body
    movieModel.create(body)
    res.status(200).send(
        "movie created " + req.body.name
    );
})

app.delete('/movies',async(req,res)=>{
    id = req.query.id
    await  movieModel.findByIdAndDelete(req.body.id)
    res.status(200).send({
        message:"Movie Deleted",
        
    });
})

app.patch('/movies',async(req,res)=>{
    body = req.body
    id = req.body.id
    await movieModel.findByIdAndUpdate(id,body)
    res.status(200).send({
        message:"Movie Updated"
    })
})

//Search By Name
app.post('/moviesSearch',async(req,res)=>{
    let payload = req.body.name.trim()
    let search =await movieModel.find({name: {$regex: new RegExp('^'+ payload+'.*','i')}}).exec();
   search = search.splice(0,10)
    res.status(200).send(search)
})


app.listen(4000,()=>{
    console.log('Server is Runing on Port 4000')
})