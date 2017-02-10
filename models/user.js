var mongoose	= require("mongoose");

// Create new user model
var User = mongoose.model("User", {
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	}
});

// var newUser = new User ({
// 	email: "           admin2@gmail.com"
// });

// newUser.save().then((doc) =>{
// 	console.log("Saved user", doc);
// }, (error) =>{
// 	console.log("Unable to save user", error)
// });


module.exports = {
	User
};