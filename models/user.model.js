const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
	email: {
		type: String,
		unique: true, //Que el email sea único
		lowercase: true, // Pasar todo a minuscula
		trim: true, //Elimina espacios
		required: [true, "Email is required"], // Requerido al llenar el formulario
		match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"] ,
		validate: {
			validator(v){
				return mongoose.model("User").findOne({ email: v }).then(u => !u)
				},
				message: "This email already exists"
			} 
	},
	password: {
		type: String,
		minlength: [6, "Password must be more than 6 characters" ],
		required: [true, "Password is required"]
	}
});

schema.pre("save", function(next){
	bcrypt.hash(this.password, 10, (err, hash) => {
		if(err){
			return next(err)
		}
		this.password = hash
		next();
	});
});

// schema.methods.isCorrectPassword = function(password, callback){
//   bcrypt.compare(password, this.password, function(err, same) {
//     if (err) {
//       callback(err);
//     } else {
//       callback(err, same);
//     }
//   });
// }

schema.statics.authenticate = async(email, password) => {
	const user = await mongoose.model("User").findOne({ email: email});
	if(user){
		return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) reject(err);
        resolve(result === true ? user : null);
      });
    });
    return user;
	}

	return null
};

module.exports = mongoose.model("User", schema);