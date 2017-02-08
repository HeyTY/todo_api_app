// const MongoClient	= 	require("mongodb").MongoClient;
const {MongoClient, ObjectID}	= 	require("mongodb");


//object destructing to way to make variables from an object properties
// var user = {name: "Ty", age: 28};
// var {name} = user;
// console.log(name); 



// Takes 2 arguements 1. URL where db lives / 2. callback function
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err,db) => {
	if (err) {
		console.log(err);
		return console.log("Unable to connect to MongoDB server")
	} 
	console.log("Connect to MongoDB server");

	// db.collection("Todos").insertOne({
	// 	text: "Something to do",
	// 	completed: false
	// },(err, result) => {
	// 	if (err) {
	// 		return console.log("Unable to insert todo", err)
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });


	// Insert new doc into Users (name, age,location)

	// db.collection("Users").insertOne({
	// 	name: "Ty Le",
	// 	age: 28,
	// 	location: "Connecticut"
	// }, (err, result) =>{
	// 	if (err) {
	// 		return console.log("Unable to add User to DB", err);
	// 	}

	// 	console.log(result.ops[0]._id.getTimestamp());
	// });


	db.close();
});