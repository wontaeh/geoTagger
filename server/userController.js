const User = require('../models/userSchema');

const bcrypt = require('bcrypt');

// middleware for logins && signups

const userController = {};
userController.createUser = (req, res) => {
	
	let createUser = new User({
    username: req.body.username,
    password: req.body.password
	});
	createUser.save((err) => {
    if(err) {
      console.log(err);
			res.send({error: 'Could not create user'});
    } else {
			console.log('no err')
			res.status(200).send();
    }
	});

};

userController.verifyUser = (req, res, next) => {
	console.log('verifyUser req.body: ', req.body);
	User.findOne({username: req.body.username}, (err, userInfo) => {
		console.log('userInfo: ',userInfo);
		if (userInfo == null) {
			// res.send({error: 'user does not exist, please create an account'});
			res.send(err);
		} else {
			console.log('req.body in verify User: ',req.body, ", userInfo: ",userInfo)
			bcrypt.compare(req.body.password, userInfo.password, (err, result)=> {
				if(result) {
					res.locals.userInfo = userInfo;
					res.json(userInfo);
				} else {
					res.send(err);
				}
			});

		}

	});

};


module.exports = userController;

