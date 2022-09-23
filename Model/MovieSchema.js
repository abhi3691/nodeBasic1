const  mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    name:String,
    year:Number,
    rating:Number
})

module.exports = movieSchema