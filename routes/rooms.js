var express = require('express');
var router = express.Router();
var Booking = require('../models/booking');
var King = require('../models/king');
var Deluxe = require('../models/deluxe');
var Single = require('../models/single');
var User = require('../models/user');
var path = require("path");

var suites=0, kingr=0, deluxer=0, singler=0;


router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../booking.html'))
})

router.post("/new", (req, res, next) => {
    console.log(req.body);
    var user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        mobile: req.body.mobile,
        email: req.body.email
    });
    console.log('Ok1');
    var message = "Booking Successfull!";

    var typex = req.body.type;

    if(typex === "Suites"){
        console.log("Inside Suite");
        var newBooking = new Booking({
            from: req.body.from,
            to: req.body.to,
            mobile: req.body.mobile,
            rooms: req.body.room
        });
        Booking.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
        });
    
        User.findByMobile(req.body.mobile, function(err,data){
            if(err) throw err;
            if(!data){
                User.saveUser(user, function(err, data){
                    if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                    //Logic Code
                    Booking.checkAvailability(req.body.from, req.body.to, function(err, data){
                        if(err) throw err;
                        var favrooms = 0;
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        var check = suites-favrooms;
                        // console.log(4-check);
                        if(4-check >= req.body.room){
                            Booking.saveBooking(newBooking, function(err, data){
                                if(err) {
                                    return res.json({status: false, message: "Booking Unsuccessfull!"});
                                }
                                return res.json({status: true, message: "Booking Successfull"});
                            });        
                        }
                        else{
                            return res.json({status: false, message:"Not Enough Rooms Available!"});
                        }
                    });
    
                    // Booking.saveBooking(newBooking, function(err, data){
                    //     if(err) {
                    //         return res.json({status: false, message: "Booking Unsuccessfull!"});
                    //     }
                    // });
                    // return res.json({'message': message, status: true});
                });
            }
            if(data){
                Booking.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    var favrooms = 0;
                    // console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    // console.log(favrooms);
                    // console.log(suites);
                    var check = suites-favrooms;
                    // console.log(4-check);
                    if(4-check >= req.body.room){
                        Booking.saveBooking(newBooking, function(err, data){
                            if(err) {
                                return res.json({status: false, message: "Booking Unsuccessfull!"});
                            }
                            return res.json({status: true, message: "Booking Successfull"});
                        });        
                    }
                    else{
                        return res.json({status: false, message:"Not Enough Rooms Available!"});
                    }
                });
            }
        });    
    }

    else if(typex === "Deluxe Rooms"){
        console.log("Inside Deluxe Function");
        Deluxe.findAll(function(err,data){
            if(err) throw err;
            deluxer=0;
            if(data){
                data.forEach(element => {
                    deluxer+=element.rooms;
                });
                console.log(deluxer);
            } 
        });
        var newBooking = new Deluxe({
            from: req.body.from,
            to: req.body.to,
            mobile: req.body.mobile,
            rooms: req.body.room
        });
        User.findByMobile(req.body.mobile, function(err,data){
            if(err) throw err;
            if(!data){
                User.saveUser(user, function(err, data){
                    if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                    //Logic Code
                    Deluxe.checkAvailability(req.body.from, req.body.to, function(err, data){
                        if(err) throw err;
                        var favrooms = 0;
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        var check = deluxer-favrooms;
                        // console.log(4-check);
                        if(4-check >= req.body.room){
                            Deluxe.saveBooking(newBooking, function(err, data){
                                if(err) {
                                    return res.json({status: false, message: "Booking Unsuccessfull!"});
                                }
                                return res.json({status: true, message: "Booking Successfull"});
                            });        
                        }
                        else{
                            return res.json({status: false, message:"Not Enough Rooms Available!"});
                        }
                    });
    
                    // Deluxe.saveBooking(newBooking, function(err, data){
                    //     if(err) {
                    //         return res.json({status: false, message: "Booking Unsuccessfull!"});
                    //     }
                    // });
                    // return res.json({'message': message, status: true});
                });
            }
            if(data){
                Deluxe.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    var favrooms = 0;
                    // console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    // console.log(favrooms);
                    // console.log(suites);
                    var check = deluxer-favrooms;
                    // console.log(4-check);
                    if(4-check >= req.body.room){
                        Deluxe.saveBooking(newBooking, function(err, data){
                            if(err) {
                                return res.json({status: false, message: "Booking Unsuccessfull!"});
                            }
                            return res.json({status: true, message: "Booking Successfull"});
                        });        
                    }
                    else{
                        return res.json({status: false, message:"Not Enough Rooms Available!"});
                    }
                });
            }
        });    
    }
    
    else if(typex === "Single"){
        var newBooking = new Single({
            from: req.body.from,
            to: req.body.to,
            mobile: req.body.mobile,
            rooms: req.body.room
        });
        console.log("Inside Single");
        Single.findAll(function(err,data){
            if(err) throw err;
            singler=0;
            if(data){
                data.forEach(element => {
                    singler+=element.rooms;
                });
                console.log(singler);
            }
            
        });
    
        User.findByMobile(req.body.mobile, function(err,data){
            if(err) throw err;
            if(!data){
                User.saveUser(user, function(err, data){
                    if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                    //Logic Code
                    Single.checkAvailability(req.body.from, req.body.to, function(err, data){
                        if(err) throw err;
                        var favrooms = 0;
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        var check = singler-favrooms;
                        // console.log(4-check);
                        if(4-check >= req.body.room){
                            Single.saveBooking(newBooking, function(err, data){
                                if(err) {
                                    return res.json({status: false, message: "Booking Unsuccessfull!"});
                                }
                                return res.json({status: true, message: "Booking Successfull"});
                            });        
                        }
                        else{
                            return res.json({status: false, message:"Not Enough Rooms Available!"});
                        }
                    });
    
                    // Single.saveBooking(newBooking, function(err, data){
                    //     if(err) {
                    //         return res.json({status: false, message: "Booking Unsuccessfull!"});
                    //     }
                    // });
                    // return res.json({'message': message, status: true});
                });
            }
            if(data){
                Single.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    var favrooms = 0;
                    // console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    // console.log(favrooms);
                    // console.log(suites);
                    var check = singler-favrooms;
                    // console.log(4-check);
                    if(4-check >= req.body.room){
                        Single.saveBooking(newBooking, function(err, data){
                            if(err) {
                                return res.json({status: false, message: "Booking Unsuccessfull!"});
                            }
                            return res.json({status: true, message: "Booking Successfull"});
                        });        
                    }
                    else{
                        return res.json({status: false, message:"Not Enough Rooms Available!"});
                    }
                });
            }
        });    
    }
    
    else if(typex === "King Rooms"){
        console.log("inside King Rooms");
        var newBooking = new King({
            from: req.body.from,
            to: req.body.to,
            mobile: req.body.mobile,
            rooms: req.body.room
        });
        King.findAll(function(err,data){
            if(err) throw err;
            kingr=0;
            if(data){
                data.forEach(element => {
                    kingr+=element.rooms;
                });
                console.log(kingr);
            }
            
        });
    
        User.findByMobile(req.body.mobile, function(err,data){
            if(err) throw err;
            if(!data){
                User.saveUser(user, function(err, data){
                    if(err) return res.json({status: false, message: "Booking Unsuccesfull!"});
                    //Logic Code
                    King.checkAvailability(req.body.from, req.body.to, function(err, data){
                        if(err) throw err;
                        var favrooms = 0;
                        // console.log(data);
                        data.forEach(element => {
                            favrooms += element.rooms;
                        });
                        // console.log(favrooms);
                        var check = kingr-favrooms;
                        // console.log(4-check);
                        if(4-check >= req.body.room){
                            King.saveBooking(newBooking, function(err, data){
                                if(err) {
                                    return res.json({status: false, message: "Booking Unsuccessfull!"});
                                }
                                return res.json({status: true, message: "Booking Successfull"});
                            });        
                        }
                        else{
                            return res.json({status: false, message:"Not Enough Rooms Available!"});
                        }
                    });
    
                    // King.saveBooking(newBooking, function(err, data){
                    //     if(err) {
                    //         return res.json({status: false, message: "Booking Unsuccessfull!"});
                    //     }
                    // });
                    // return res.json({'message': message, status: true});
                });
            }
            if(data){
                King.checkAvailability(req.body.from, req.body.to, function(err, data){
                    if(err) throw err;
                    var favrooms = 0;
                    // console.log(data);
                    data.forEach(element => {
                        favrooms += element.rooms;
                    });
                    // console.log(favrooms);
                    // console.log(kingr);
                    var check = kingr-favrooms;
                    // console.log(4-check);
                    if(4-check >= req.body.room){
                        King.saveBooking(newBooking, function(err, data){
                            if(err) {
                                return res.json({status: false, message: "Booking Unsuccessfull!"});
                            }
                            return res.json({status: true, message: "Booking Successfull"});
                        });        
                    }
                    else{
                        return res.json({status: false, message:"Not Enough Rooms Available!"});
                    }
                });
            }
        });    
    }
});

router.post("/check", (req, res, err)=> {
    var typec = req.body.type;
    if(typec==="Suites"){
        var newBooking = new Booking({
            from: req.body.from,
            to: req.body.to,
            mobile: req.body.mobile,
            rooms: req.body.room
        });
        Booking.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
        });
        Booking.checkAvailability(req.body.from, req.body.to, function(err, data){
            if(err) throw err;
            var favrooms = 0;
            // console.log(data);
            data.forEach(element => {
                favrooms += element.rooms;
            });
            // console.log(favrooms);
            var check = suites-favrooms;
            // console.log(4-check);
            if(4-check >= req.body.room){
                return res.json({status: true, message: "Avail"});        
            }
            else{
                return res.json({status: false, message:"Not Avail"});
            }
        });
    }

    else if(typec === "King Rooms"){
        var newBooking = new King({
            from: req.body.from,
            to: req.body.to,
            mobile: req.body.mobile,
            rooms: req.body.room
        });
        King.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
        });
        King.checkAvailability(req.body.from, req.body.to, function(err, data){
            if(err) throw err;
            var favrooms = 0;
            // console.log(data);
            data.forEach(element => {
                favrooms += element.rooms;
            });
            // console.log(favrooms);
            var check = suites-favrooms;
            // console.log(4-check);
            if(4-check >= req.body.room){
                return res.json({status: true, message: "Avail"}); 
            }
            else{
                return res.json({status: false, message:"Not Avail"});
            }
        });
    }

    else if(typec === "Deluxe Rooms"){
        var newBooking = new Deluxe({
            from: req.body.from,
            to: req.body.to,
            mobile: req.body.mobile,
            rooms: req.body.room
        });
        Deluxe.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
        });
        Deluxe.checkAvailability(req.body.from, req.body.to, function(err, data){
            if(err) throw err;
            var favrooms = 0;
            // console.log(data);
            data.forEach(element => {
                favrooms += element.rooms;
            });
            // console.log(favrooms);
            var check = suites-favrooms;
            // console.log(4-check);
            if(4-check >= req.body.room){
                return res.json({status: true, message: "Avail"});         
            }
            else{
                return res.json({status: false, message:"Not Avail"});
            }
        });
    }

    else if(typec === "Single"){
        var newBooking = new Single({
            from: req.body.from,
            to: req.body.to,
            mobile: req.body.mobile,
            rooms: req.body.room
        });
        Single.findAll(function(err,data){
            if(err) throw err;
            suites=0;
            if(data){
                data.forEach(element => {
                    suites+=element.rooms;
                });
                console.log(suites);
            }
        });
        Single.checkAvailability(req.body.from, req.body.to, function(err, data){
            if(err) throw err;
            var favrooms = 0;
            // console.log(data);
            data.forEach(element => {
                favrooms += element.rooms;
            });
            // console.log(favrooms);
            var check = suites-favrooms;
            // console.log(4-check);
            if(4-check >= req.body.room){
                return res.json({status: true, message: "Avail"});        
            }
            else{
                return res.json({status: false, message:"Not Avail"});
            }
        });
    }
});

module.exports = router;