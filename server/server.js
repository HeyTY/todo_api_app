// //Same thing
// var mongoose		= require("./db/mongoose").mongoose; 
var express			= require("express");
var bodyParser		= require("body-parser");

var {mongoose} 		= require("./db/mongoose");
var {Todo}			= require("./models/todo");
var {User}			= require("./models/user");
var {ObjectID}		= require("mongodb");


var app				= express();

app.use(bodyParser.json());



app.get("/", (req,res) => {
	res.send("Welcome to the Homepage");
});


// app.get("/todos", (req,res) => {

// });

app.post("/todos", (req,res) => {
	// console.log(req.body);


	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) =>{
		res.send(doc);
	}, (error) =>{	
		res.status(400).send(error);
	});
});

app.get("/todos", (req,res) =>{
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});


// API route to fetch an individual todo

// GET /todos/:123

app.get("/todos/:id", (req,res) => {
	var id = req.params.id
	
	// Validate
	if (!ObjectID.isValid(id)) {
		// res.status(404).send({})
		res.status(404).send("ID is not valid, Please try again.")
	}

	// findById
	Todo.findById(id).then((todo) => {
		if (!todo) {
			res.status(404).send();
		}
		res.send({todo});	
	// error / 400 -- send back nothing	
	}, (e) => {
		res.status(400).send();
	});
});



app.listen(3000, (req,res) =>{
	console.log("Server Deployed!");
});



module.exports = {
	app
};