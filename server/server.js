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



// Root
app.get("/", (req,res) => {
	res.send("Welcome to the Homepage");
});


// POST - Create New Todo
app.post("/todos", authenticate, (req,res) => {
	// console.log(req.body);


	var todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc) =>{
		res.send(doc);
	}).catch((error) =>{	
		res.status(400).send(error);
	});
});

// Find All Todos
app.get("/todos", authenticate, (req,res) =>{
	Todo.find({
		_creator: req.user._id
	}).then((todos) => {
		res.send({todos});
	}).catch((e) => {
		res.status(400).send(e);
	});
});



// Find Todo by ID
app.get("/todos/:id", authenticate, (req,res) => {
	var id = req.params.id;
	
	// Validate
	if (!ObjectID.isValid(id)) {
		// res.status(404).send({})
		res.status(404).send("ID is not valid, Please try again.")
	}

	// findById
	Todo.findOne({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
		if (!todo) {
			res.status(404).send();
		}
		res.send({todo});	
	// error / 400 -- send back nothing	
	}).catch((e) => {
		res.status(400).send();
	});
});

// Delete Todo
app.delete("/todos/:id",authenticate, (req,res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		res.status(404).send("ID is not valid, Please try again")
	}

	
	Todo.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
		if (!todo) {
		return res.status(404).send();
	}

	res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

// Update Todo
app.patch("/todos/:id", authenticate, (req,res) => {
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


	Todo.findOneAndUpdate({	_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
		if(!todo) {
			res.status(404).send();
		}
			res.status(200).send({todo});
	}).catch((e) =>{
		res.status(400).send();
	})
});


// POST - Create New User
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

// User Profile
app.get("/users/me", authenticate, (req, res) => {
	res.send(req.user);
});


// Login User
app.post("/users/login", (req, res) => {
	var body = _.pick(req.body, ["email", "password"]);

	User.findByCredentials(body.email,body.password).then((user) =>{
		user.generateAuthToken().then((token) =>{
			res.header("x-auth", token).send(user);	
		});
	}).catch((error) =>{
		res.status(400).send( );
	})
});


// Loggout User
app.delete("/users/me/token", authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() =>{
		res.status(200).send();
	}, () => {
		res.status(400).send();
	})
});

app.listen(port, (req,res) =>{
	console.log(`Server Deployed on port ${port}!`);
});



module.exports = {
	app
};