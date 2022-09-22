const express = require('express')

const movies =require('./database.json')




const server =express()
server.use(express.json())

server.get('/movies',(req,res)=>{
    res.status(200).send({
        message:"Heare are your movies my fried 😊 ",
        data:movies
    });
})

server.post('/movies',(req,res)=>{
    movies.push(req.body)
    res.status(200).send({
        message:"Heare are your movies my fried 😊 ",
        data:movies
    });
})

server.delete('/movies',(req,res)=>{
    id = req.query.id
    const index = movies.findIndex((movie) => movie.id === parseInt(id))
    movies.splice(index);
    res.status(200).send({
        message:"Movie Deleted",
        
    });
})


server.listen(4000,()=>{
    console.log('Server is Runing on Port 4000')
})