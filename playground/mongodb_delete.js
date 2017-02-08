// const MongoClient	= 	require("mongodb").MongoClient;
const {MongoClient, ObjectID}	= 	require("mongodb");



// Takes 2 arguements 1. URL where db lives / 2. callback function
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err,db) => {
	if (err) {
		console.log(err);
		return console.log("Unable to connect to MongoDB server")
	} 
	console.log("Connect to MongoDB server");

	// deleteMany
	// db.collection("Todos").deleteMany({text: "Something to do"}).then((result) => {
	// 	console.log(result);
	// });

	// deleteOne
	// db.collection("Todos").deleteOne({text : "Workout"}).then((result) => {
	// 	console.log(result);
	// });
	// findOneAndDelete

	// db.collection("Todos").findOneAndDelete({completed: false}).then((result)=>{
	// 	console.log(result);
	// });

	// delete duplicate user

	// db.collection("Users").deleteMany({name: "Ty Le" }).then((result) => {
	// 	console.log(result);
	// });


	// delete Tuan by ID

	db.collection("Users").findOneAndDelete({_id: new ObjectID("589a6cc0fc2faa097b8cd423")}).then((result) =>{
		console.log(result);
	});


	// db.close();





});