// const MongoClient	= 	require("mongodb").MongoClient;
const {MongoClient, ObjectID}	= 	require("mongodb");



// Takes 2 arguements 1. URL where db lives / 2. callback function
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err,db) => {
	if (err) {
		console.log(err);
		return console.log("Unable to connect to MongoDB server")
	} 
	console.log("Connect to MongoDB server");


	// db.collection("Todos").findOneAndUpdate({
	// 	_id: new ObjectID("589b9f770ad9f3901442b785")
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }). then((result) =>{
	// 	console.log(result);
	// });


	// Update name / increment age +1

	db.collection("Users").findOneAndUpdate({
		_id: ObjectID("589a6e18a39fa10980c9ac9d")
	}, {
		$set: {
			name:"Name Hacked v3"
		},
		$inc: {
			age: +100
		}
	},{
		returnOriginal: false
	}).then((result) =>{
		console.log(result);
	});



	// db.close();





});