const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
const path = require('path')

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://movies123:movies123@cluster0.hljsi.mongodb.net/data?retryWrites=true&w=majority' || "mongodb://localhost:27017/movies", { useNewUrlParser:true, useUnifiedTopology: true,useCreateIndex: true}), (err)=>{
  if(err) throw err;
  console.log("MongoDB connection established")
}
// mongoose.connect(uri || "mongodb://localhost:27017/movies", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useCreateIndex: true
// 	}, (err)=>{
// 	if(err) throw err;
// 	console.log("MongoDB connection established")
// });

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
