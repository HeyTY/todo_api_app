var mongoose = require("mongoose");


mongoose.Promise = global.Promise;

// let db = {
//   localhost: "mongodb://localhost:27017/TodoApp",
//   mlab: "mongodb://heyty:A1b2c3d4@ds147799.mlab.com:47799/todo_api_db"
// };

// mongoose.connect( process.env.PORT ? db.mlab : db.localhost);

mongoose.connect(process.env.MONGODB_URI); 


module.exports = {
	mongoose
};




