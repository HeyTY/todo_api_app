// const MongoClient	= 	require("mongodb").MongoClient;
const {MongoClient, ObjectID}	= 	require("mongodb");



// Takes 2 arguements 1. URL where db lives / 2. callback function
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err,db) => {
	if (err) {
		console.log(err);
		return console.log("Unable to connect to MongoDB server")
	} 
	console.log("Connect to MongoDB server");

						// Inside find is the query
	// db.collection("Todos").find({
	// 	_id: new ObjectID("589b7a530ad9f3901442b28e")
	// }).toArray().then((docs) => {
	// 	console.log("Todos:");
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log("Unable to fetch todos", err);
	// });


	// 	db.collection("Todos").find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log("Unable to fetch todos", err);
	// });

		db.collection("Users").find({
			name: "Ty Le"
		}).toArray().then((docs) =>{
			console.log(`Users:`);
			console.log(JSON.stringify(docs,undefined,2));
		}, (err) => {
			console.log("Unabke to fetch todos", err);
		});


	// db.close();
});