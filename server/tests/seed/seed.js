const {ObjectID}	= require("mongodb");
const {Todo}		= require("./../../models/todo");
const {User}		= require("./../../models/user");
const jwt			= require("jsonwebtoken");


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id: userOneId,
	email: "admin1@gmail.com",
	password: "password",
	tokens: [{
		access: "auth",
		token: jwt.sign({_id: userOneId, access: "auth"}, "secret123").toString()
	}]
}, {
	_id: userTwoId,
	email: "admin2@gmail.com",
	password:"password2"
}];

const todos	= [{
	_id: new ObjectID(), 
	text: "First test todo"
}, {
	_id: new ObjectID(), 
	text: "Second test todo v2",
	completed: "true",
	completedAt: 123
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();
	
	return Promise.all([userOne, userTwo])
	}).then(() => done());
};


module.exports = {
	todos,
	populateTodos,
	users,
	populateUsers

};