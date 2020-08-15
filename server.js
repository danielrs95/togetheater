const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/movies", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
	}, (err)=>{
	if(err) throw err;
	console.log("MongoDB connection established")
});

const moviesRouter = require('./routes/movies.js');
const usersRouter = require('./routes/users.js');

app.use('/movies', moviesRouter);
app.use('/users', usersRouter); 


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});