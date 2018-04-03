//ServerSide
const express = require('express');
let http = require('http');
var request = require('request');
const server = express();
const ROOT_DIR = '/public';
const PORT = process.env.PORT || 3000;
const API_KEY = 'cb4bdcac8a68aa09a7dac63e8d5ce570';
let ingredient = "";

server.use(express.static(__dirname + ROOT_DIR));
//routing request
server.get('/', (req,res) =>{
	let API_URL = `http://food2fork.com/api/search?q=juice&key=${API_KEY}`;
	request(API_URL, (error, response, body)=>{
		res.sendFile(__dirname+'/public/assignment4.html', {
			data: JSON.stringify(body)
		});
	})
});

server.post('/', (req,res) =>{
	let API_URL = `http://food2fork.com/api/search?q=basil,cumin&key=${API_KEY}`;
	request(API_URL, (error, response, body)=>{
		res.json(JSON.stringify(body));
	})
});

server.get('/recipes', (req,res) => {
	let recipeIngredient = req.query.ingredient;
	if (!recipeIngredient) ingredient = 'basil';
	else ingredient = recipeIngredient;

	let API_URL = `http://food2fork.com/api/search?q=${ingredient}&key=${API_KEY}`;
	request(API_URL, (error, response, body) => {
		res.json(JSON.stringify(body));
	});
});
//localhost/index
server.get('/index.html', (req,res) =>{
	//res.sendFile(__dirname+'/public/assignment3.html');
	let API_URL = `http://food2fork.com/api/search?q=juice&key=${API_KEY}`;
	request(API_URL, (error, response, body)=>{
		res.sendFile(__dirname+'/public/index.html', {
			data: JSON.stringify(body)
		});
	})
});
//localhost/recipes.html
server.get('/recipes.html', (req,res) =>{
	//res.sendFile(__dirname+'/public/assignment3.html');
	let API_URL = `http://food2fork.com/api/search?q=juice&key=${API_KEY}`;
	request(API_URL, (error, response, body)=>{
		res.sendFile(__dirname+'/public/recipes.html', {
			data: JSON.stringify(body)
		});
	})
});

//Listening for requests:
server.listen(PORT, err => {
	if(err) console.log(err);
	else {console.log(`Server listening on port: ${PORT}`)};
});
