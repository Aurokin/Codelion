/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	login: function (req, res) {
		User.findOne({
			userName: req.body.userName
		},
		function(err, user) {
			if (err) {
				res.json({ error: 'DB error' }, 500);
			}
			if (!user) {
				res.redirect('/');
			}
			else {
				bcrypt.compare(req.body.password, user.password, function(err, match){
					if (match) {
						//console.log('login');
						req.session.userName = user.userName;
						req.session.user = user.id;
						res.redirect('/home');
					}
					else {
						res.view('error', {error: 'Password Not Correct'});
					}
				});
			}
		});
	},

	logout: function (req, res) {
		//console.log(req.session);
		req.session.destroy(function() {
			res.redirect('/');
		});
	},

	create: function(req, res) {
		User.create(req.body).exec(function(err, user) {
			if (err) {
				return res.view('error', {error: 'Username/Email May Already Be Taken, Or Incorrect Password'});
			}
			req.session.userName = user.userName;
			req.session.user = user.id;
			return res.redirect('/home');
		});
	},

	groups: function(req, res) {
		console.log(req.session.user);
		if (req.session.user) {
			User.findOne(req.session.user).populate('admins').populate('groups').exec(function(err, user) {
				if (err) {
					res.view('error', {error: 'Group Error'});
				}
				else {
					console.log(user);
					res.view('group/listPersonal', {user: user});
				}
			});
		}
		else {
			res.view('error', {error: 'User Not Logged In'});
		}
	},
};
