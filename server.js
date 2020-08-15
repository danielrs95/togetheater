const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const path = require('path')

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

app.use('/api/movies', moviesRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
