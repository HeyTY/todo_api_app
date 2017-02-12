const expect 		= require("expect");
const request 		= require("supertest");
const {ObjectID}	= require("mongodb");

const {app} 		= require("./../server");
const {Todo}		= require("./../models/todo");


const todos			= [{
	_id: new ObjectID(), 
	text: "First test todo"
}, {
	_id: new ObjectID(), 
	text: "Second test todo v2",
	completed: "true",
	completedAt: 123
}];


beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});


describe("POST /todos", () =>{
	it("Should create a new todo", (done) =>{
		var text = "Test todo text";


		request(app)
		.post("/todos")
		.send({text})
		.expect(200)
		.expect((res) =>{
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if (err) {
				return done(err);
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => done(e)); 
		});
	});

	it("should not create todo with invalid body data", (done) => {

		// no text variable

		// Pass nothing at all

		// make a pos reqest to same url, send empty object, expect a 400
		request(app)
		.post("/todos")
		.send({})
		.expect(400)

		// callback
		.end((err, res) =>{
			if(err) {
				return done(err);
			}
		// assumption length of todos is 0
			Todo.find().then((todos) =>{
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));	
		});
	});
});


describe("GET /todos", () => {
	it("should get all todos", (done) =>{
		request(app)
			.get("/todos")
			.expect(200)
			.expect((res) =>{
				expect(res.body.todos.length).toBe(2);
			})
			.end (done);
	});
});




// Test 

describe("GET /todos/:id", () => {

	it("should return todo doc", (done) =>{
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) =>{
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);

	});


	it("should return todo 404 if todo not found", (done) =>{
		var id2 = new ObjectID() 
		request(app)
			.get(`/todos/${id2.toHexString()}`)
			.expect(404)
			.end(done);	
	});


	it("should return 404 for non-object ids", (done) => {
		request(app)
			.get("/todos/123")
			.expect(404)
			.end(done);
	});
});


describe("DELETE /todos/:id", (done)=> {

	it("should remove a todo", (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res)=> {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err, res) =>{
				if (err) {
					return done(err);
				}
				Todo.findById(hexId).then((todo) =>{
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
			
				// query db using findById  toNotExit
				// expect(null).toNotExist;
			});
	});




	it("should return 404 if todo not found", (done) =>{
		var hexId = new ObjectID() 
		request(app)
			.delete(`/todos/${hexId.toHexString()}`)
			.expect(404)
			.end(done);	
	});



	it("should return 404 if object id is invalid", (done) =>{
		request(app)
			.delete("/todos/123")
			.expect(404)
			.end(done);
	});
});



describe("PATCH /todos/:id", (done) => {
	
	it("should update the todo", (done) => {
		// grab id of first item
		var hexId = todos[0]._id.toHexString();
		var text = "HACKED BITCH v2!";
		var completed = true;

		// update text to w/e, set completed to true
		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				text,
				completed
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(text)
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA("number")
			})
			.end(done);
	});


	it("should clear completedAt when todo is not completed", (done) => {
		
		var hexId = todos[1]._id.toHexString();
		var text = "2nd one just got hacked yo";
		var completed = false;

		request(app)
			.patch(`/todos/${hexId}`)
			.send({
				text,
				completed
			})
			.expect(200)
			.expect((res) =>{
				expect(res.body.todo.text).toBe(text)
				expect(res.body.todo.completed).toBe(false)
				expect(res.body.todo.completedAt).toNotExist()
			})
			.end(done);
	});

});





