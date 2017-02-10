const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {User}	 = require("./../server/models/user");
const {Todo} 	 = require("./../server/models/todo");

// var id = "589e194e216fbb046af3152c11";

// if (!ObjectID.isValid(id)){
// 	console.log("ID not valid");
// }

// Todo.find({
// 	_id: id
// }).then((todos) =>{
// 	console.log ("Todos", todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) =>{
// 	console.log ("Todo", todo);
// });

// Todo.findById(id).then((todo) =>{
// 	if (!todo) {
// 		return console.log("ID not found");
// 	}
// 	console.log ("Todo by id", todo);
// }).catch((e) => console.log(e));



var id = "589cecf2922d9c04c9816422ZZ";

// User.findById User collection

User.findById(id).then((user) =>{
	if (!user) {
		return console.log("User ID not found");
	}
	console.log (JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

// 1 query works but no user

// 2 console.log user

// 3. handle errors