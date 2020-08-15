const router = require('express').Router();
const User = require('../models/user.model.js');
const  auth  = require("../middlewares/auth");
const jwt = require("jsonwebtoken")

// Peticion a http://localhost:5000/users/ para ver todos los usuarios
router.get( '/', auth, async(req,res)=>{
	try{
		const users = await User.find()
		res.json(users)
	}catch(err){
		return res.status(400).json(err)
	}
})

// Peticion a http://localhost:5000/users/register para agregar usuario
router.post('/register', async(req, res, next)=>{
	const data = {
		email: req.body.email,
		password: req.body.password,
	}
	try{
		const user = new User(data);
		await user.save();
		res.json({
			user,
			msg: "Successfully registered"
		});
	} catch (err){
		res.json({error: err})
	}
});

router.post('/login', async(req, res, next)=>{
	try{
		const user = await User.authenticate(req.body.email, req.body.password)
		if(user) {
			const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
			res.json({
				ok: true,
				token,
				user: {
					"_id": user._id,
					"email": user.email
				},
			});
		} else {
			res.json({error: "Invalid username or password"})
		}
	} catch(e) {
		return next(err)
	}
})

// Ruta para ver si el token es valido, booleano para el frontend
router.post('/tokenIsValid', async(req, rest, next)=>{
	try{
		
	}catch(err){
		res.status(500).json({err: err.message})
	}
})

module.exports = router