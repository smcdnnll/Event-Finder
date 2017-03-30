var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/loginapp');


var Event = require('../models/event');


router.get('/all-events', function(req, res){
	Event.find(function(err, events){
		console.log(events);
		res.render('events/all-events', {
			events: events
		});
	});
	
});

router.get('/api/events', (req, res) => {
    Event.getEvents((err, events) => {
        if(err){
            throw err; 
        }
        res.json(events);
    });
});

router.get('/api/events/:_id', (req, res) => {
    Event.getEventById(req.params._id, (err, event) => {
        if(err){
            throw err;
        }
        res.json(event);
    });
});

router.get('/create-event', function (req, res) {
  res.render('events/create-event');
});


router.get('/edit-event/:id', function (req, res) {
    var id = req.params.id;
    Event.findById(id, function(err,event){
    res.render('events/edit-event',
        {event : event});
    });
    
});



router.post('/edit-event/:id', function(req, res){
    var id = req.params.id;
   Event.findById(id, function(err, event){
		event.title=req.body.title,
        event.description=req.body.description;
        event.location=req.body.location;
        event.cost = req.body.cost;
        event.image_url = req.body.image_url;
      
        event.save();

        res.redirect("/events/all-events");
   });
});

router.get('/delete-event/:id', function(req, res){
	var id = req.params.id;
	Event.findById(id, function(err, event){
		event.title=req.body.title;
        event.description=req.body.description;
        event.location=req.body.location;
        event.cost = req.body.cost;
        event.image_url = req.body.image_url;

		event.remove();

		 res.redirect('/events/all-events');
	});
 
});




router.post('/api/events', (req, res) => {
   var newEvent = new Event({
		title: req.body.title,
		description: req.body.description,
		location: req.body.location,
		cost: req.body.cost,
        image_url: req.body.image_url
   }).save(function(err,event){
	   console.log(event);
	   res.redirect('/events/all-events');
   });
   
   
});

router.put('/api/events/:_id', (req, res) => {
    var id = req.params._id;
    Events.removeEvent(id, (err, genre) => {
        if(err){
            throw err;
        }
        res.json(genre);
    })
})

router.delete('/api/events/:_id', (req, res) => {
    var id = req.params._id;
    Event.removeEvent(id, (err, genre) => {
        if(err){
            throw err;
        }
        res.json(event);
    })
})

module.exports = router;