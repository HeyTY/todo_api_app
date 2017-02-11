const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {User}	 = require("./../server/models/user");
const {Todo} 	 = require("./../server/models/todo");


// We do not get the docs back 
// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove


Todo.findByIdAndRemove("589f7aeff4c67adf54cc525d").then((todo) => {
	console.log(todo);
});

