/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	createPost: function(req, res) {
		var groupID = req.param('id');
		if (req.session.user) {
			if (groupID) {
				Group.find({where: {admin: req.session.user, id: groupID}}).exec(function(err, group) {
					if (err) {
						res.view('error', {error: 'Group Error'});
					}
					else {
						console.log(group);
						console.log("^ printed from PostController");
						if (group[0]) {
							res.view('group/createPost', {group: group});
						} else {
							res.view('error', {error: 'Group Not Found, Or You Are Not An Admin!'});
						}
//-----

//-----
					}
				});
			} else {
				res.view('error', {error: 'No Group ID'});
			}

		} else {
			res.view('error', {error: 'User Not Logged In'});
		}
	},
};
