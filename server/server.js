// //Same thing
// var mongoose		= require("./db/mongoose").mongoose; 
var express			= require("express");
var bodyParser		= require("body-parser");

var {mongoose} 		= require("./db/mongoose");
var {Todo}			= require("./models/todo");
var {User}			= require("./models/user");


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


app.listen(3000, (req,res) =>{
	console.log("Server Deployed!");
});



module.exports = {
	app
};