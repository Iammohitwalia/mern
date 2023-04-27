//require dotenv files
const dotenv = require('dotenv');
//required mongoose
const mongoose = require('mongoose');

//Basic Simple requirements to start backend in nodejs
const express = require('express');
//this app is required in all methods that are coming up
const app = express();

//dotenv configuration 
dotenv.config({path: './config.env'});
require('./db/conn');

app.use(express.json());
//mongodb connection  with mongoose
const PORT = process.env.PORT;

// we link the router files 
app.use(require('./router/auth'));


//custom middleware function like we can add condition on pages.
//here I can use request from server and next is used to send responce after succesfull condition
const middleware = (req, res, next) => {
console.log('This is first middleare');
next();
}



//Homepage routes in server
app.get('/',(req, res) => {
res.send('hello world from mohit walia app.js' );
});

//Here I added the middleware in about page
app.get('/about',middleware, (req, res) => {
    res.send('About me page');
});


app.get('/contact',(req, res) => {
        res.send('contact page');
});
app.get('/signin',(req, res) => {
    res.send('signup page');
});
app.get('/login',(req, res) => {
    res.send('login page');
});       

console.log('welcome');


//This is the port where the local server is running.
app.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`);
})