const {SHA256}		= require("crypto-js");
const jwt			= require("jsonwebtoken");
const bcrypt		= require("bcryptjs");


var password = "123abc!";

// Call 2 methods

// bcrypt.genSalt(10, (err,salt) => {
// 	bcrypt.hash(password, salt, (err,hash) => {
// 		console.log(hash);
// 	});
// });

var hashedPassword = "$2a$10$ymXHhg5T/dChFn8EUV/Q6.Xa3I9FpZG3JTM7MP5NXpq4/kbQhrQKK";

bcrypt.compare(password,hashedPassword,(err,res) =>{
	console.log(res);
});



// var data = {
// 	id: 18009771234
// }


// var token = jwt.sign(data, "wtf");
// console.log(token);


// var decoded = jwt.verify(token, "wtf")
// console.log("decoded:",decoded);

// var message =  "I am user number #9"
// var hash 	= SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);



// var data = {
// 	id: 10
// };

// var token = {
// 	data,
// 	hash:SHA256(JSON.stringify(data) + "somesecret").toString()
// }



// //Middleman

// token.data.id = 10;
// token.hash = SHA256(JSON.stringify(token.data)).toString();



// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

// if (resultHash === token.hash) {
// 	console.log("Data was not changed");
// } else {
// 	console.log("Data was changed. DO NOT TRUST!");
// }