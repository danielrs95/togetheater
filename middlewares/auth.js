const jwt = require("jsonwebtoken");
const User = require('../models/user.model.js');


const auth = async(req, res, next) => {
	const token = req.header("Authorization");
	try{
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);

		if (user) {
			req.user = user; // Sobrevive la peticion y queda almacenado
			next();
		} else {
			res.status(401).send({error: "Not authenticated"})
		}
	} catch (err){
		if (err.name === "JsonWebTokenError") {
			res.status(401).send({error: "Invalid Token"})
		} else {
			return next(err)
		}
	}
};

module.exports = auth