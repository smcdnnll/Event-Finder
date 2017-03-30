var mongoose = require('mongoose');

// Event Schema
var EventSchema = mongoose.Schema({
	title: {
		type: String,
		index:true
	},
	description: {
		type: String
	},
	location: {
		type: String
	},
	cost: {
		type: String
	},
    image_url: {
        type: String
    }
});

var Event = module.exports = mongoose.model('Event', EventSchema);

//get events 
module.exports.getEvents = (callback, limit) => {
    Event.find(callback).limit(limit);
}

//get event 
module.exports.getEventById = (id, callback) => {
    Event.findById(id, callback);
}

//add event
module.exports.addEvent = (book, callback) => {
    Event.create(event, callback);
}

//update event
module.exports.updateEvent = (id, event, options, callback) => {
    var query = {_id: id};
    var update = {
        title: event.title,
        description: event.description,
        location: event.location,
        cost: event.cost,
        image_url: event.image_url
    }

    Event.findOneAndUpdate(query, update, options, callback);
}

//delete event
module.exports.removeEvent = (id, callback) => {
    var query = {_id:id};
    Event.remove(query, callback);
}
// module.exports.getAll = function(callback, limit){
// 	console.log("getting all events");
// 	Event.find().limit(limit)
// 		.populate('')
// };
// module.exports.createEvent = function(newEvent, callback){
// 			newEvent.title
// 			newEvent.description
// 			newEvent.location
// 			newEvent.cost
// 	        newEvent.save(callback);
// }

// module.exports.getEventByTitle = function(title, callback){
// 	var query = {title: title};
// 	Event.findOne(query, callback);
// }

// module.exports.getEventById = function(id, callback){
// 	Event.findById(id, callback);
// }

