const router = require('express').Router();
const auth  = require("../middlewares/auth");

const Movie = require('../models/movies.model.js');

// Peticion a http://localhost:5000/movies/ para ver todas las movies publicadas. Se cambio a POST porque para usar el GET y recibir info debia usar el paramms y query string. Asi me parece mas entendible
router.get( '/', auth,  async(req,res)=>{
	try{
		const movies = await Movie.find({user: req.query.user})
		res.json(movies)
	}catch(err){
		return res.status(400).json(err)
	}
})

// Peticion a http://localhost:5000/movies/add para agregar movie
router.post('/add', auth, async(req, res, next)=>{
	const data = {
		api_movie_id: req.body.api_movie_id,
		title: req.body.title,
		user: req.body.user
	}
	try{
		const already_movie = await Movie.findOne({api_movie_id: req.body.api_movie_id})
		if(already_movie===null) {
			const movie = new Movie(data);
			await movie.save();
			res.json({movie, msg: "Movie added to your wishlist!"});
		} else{
			res.json({error: true, msg: 'Movie already on your wishlist'})
		}
	} catch (err){
		res.status(400).json(err)
	}
});

// Eliminar movie por id
router.delete('/:id', auth, async(req, res, next)=>{
	try{
		await Movie.deleteOne({ _id: req.params.id})
		res.json('Movie deleted')
	}catch(err){
		res.status(400).json(err)
	}
})

module.exports = router
// Encontrar movie especifica por id
// router.get('/:id', async(req, res, next)=>{
// 	try{
// 		const movie = await Movie.findById(req.params.id)
// 		res.json(movie)
// 	}catch(err){
// 		res.status(400).json(err)
// 	}
// })


// Actualizar movie
// router.put('/update/:id', async(req, res, next)=>{
// 	const movie = await Movie.findById(req.params.id)
// 	movie.title = req.body.title
// 	try{
// 		await movie.save()
// 		res.json('Movie updated')
// 	}catch(err){
// 		res.status(400).json(err)
// 	}
// })
