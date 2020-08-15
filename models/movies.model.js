const mongoose = require("mongoose")
const User = require("../models/user.model.js");


const MovieSchema = mongoose.Schema({
	title: {type: String, required: true},
	user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  api_movie_id: {type: String, required: true}
})

const Movie = mongoose.model("Movie", MovieSchema);


module.exports = Movie;