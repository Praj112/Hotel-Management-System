const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const rooms  = require('./routes/rooms');
const service = require('./routes/service');

//db creation and connection
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/HotelManagement", {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true});

//running express
var app = express();

//app properties
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname + '/public/')));
// app.use((req, res, next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
    // res.render(path.join(__dirname + '/../index.html'))
});

app.get("/rooms", (req, res, next)=> {
    res.sendFile(path.join(__dirname + '/../rooms.html'));
});

app.use('/services', service);

app.use('/booking', rooms);
//running server
app.set('port', (process.env.PORT || 3000));
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server started on Port: " + app.get('port'));
});
