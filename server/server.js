// //Same thing
// var mongoose		= require("./db/mongoose").mongoose; 

					  require ("./config/config")
const _				= require("lodash");
const express		= require("express");
const bodyParser	= require("body-parser");
const {ObjectID}	= require("mongodb");

var {mongoose} 		= require("./db/mongoose");
var {Todo}			= require("./models/todo");
var {User}			= require("./models/user");
var {authenticate}  = require("./middleware/authenticate");



var app				= express();
const port 			= process.env.PORT;


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
	}).catch((error) =>{	
		res.status(400).send(error);
	});
});

app.get("/todos", (req,res) =>{
	Todo.find().then((todos) => {
		res.send({todos});
	}).catch((e) => {
		res.status(400).send(e);
	});
});


// API route to fetch an individual todo

// GET /todos/:123

app.get("/todos/:id", (req,res) => {
	var id = req.params.id;
	
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
	}).catch((e) => {
		res.status(400).send();
	});
});


app.delete("/todos/:id", (req,res) => {

	var id= req.params.id;
	if (!ObjectID.isValid(id)) {
		res.status(404).send("ID is not valid, Please try again")
	}
	// remove todo by id
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			res.status(404).send();
			}
			res.status(200).send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});


app.patch("/todos/:id", (req,res) => {
	var id 	 = req.params.id;
	var body = _.pick(req.body, ["text","completed"]);

	if (!ObjectID.isValid(id)) {
			// res.status(404).send({})
			res.status(404).send("ID is not valid, Please try again.")
		}

	if (_.isBoolean(body.completed) && body.completed ) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed 	 = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if(!todo) {
			res.status(404).send();
		}
			res.status(200).send({todo});
	}).catch((e) =>{
		res.status(400).send();
	})
});



app.post("/users", (req,res) => {
	var body = _.pick(req.body, ["email","password"]);
	var user = new User(body);

	user.save().then((user) => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header("x-auth", token).send(user);	
	}).catch((error) => {
		res.status(400).send(error);
	});
});


app.get("/users/me", authenticate, (req, res) => {
	res.send(req.user);
});



app.listen(port, (req,res) =>{
	console.log(`Server Deployed on port ${port}!`);
});



module.exports = {
	app
};