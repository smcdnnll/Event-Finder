var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/', function(req, res) {
	var name = '';
	getName(function(data){
		name = data;
		console.log(name);

		res.render('index', {
			title: name,

		});
	});
});

router.get('/', function(req, res) {
    res.render('index', { username: req.user.username });
});

function getName(callback){
	db.loginapp.find({name}, function(err, objs){
		var returnable_name;
		if (objs.lenght == 1)
		{
			returnable_name = objs[0].name;
			console.log(returnable_name);
			callback(returnable_name)
		}

	})
}

module.exports = router;