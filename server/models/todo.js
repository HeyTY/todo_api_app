var mongoose	= require("mongoose");


// Create Todo Model
var Todo = mongoose.model("Todo", {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// var newTodo = new Todo({
// 	text: "Work on shoppingcart app"
// });

// var newTodo = new Todo({
// 	text: "Shovel snow",
// 	completed: false,
// 	completedAt: 1486677644 
// });

// newTodo.save().then((doc) => {
// 	console.log("Saved todo", doc);
// }, (e) => {
// 	console.log("Unable to save todo");
// });

module.exports = {
	Todo
};