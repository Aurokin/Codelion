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
	post: function(req, res) {
		var postID = req.param('id');
		console.log(postID);
		if (postID && req.session.user) {
			Post.findOne(postID)
				.then(function(post) {
					if (post === undefined) {
						return res.view('error', {error: 'No Post Found'});
					}
					var postData = Post.findOne({id: postID}).populate('author')
						.then(function(postData) {
							return postData;
						})
					;
					var groupData = Group.findOne({id: post.group}).populate('members')
						.then(function(groupData) {
							return groupData;
						})
					;
					return [postData, groupData];
				})
				.spread(function(postData, groupData) {
					console.log(groupData);
					var isInGroup = false;
					if (groupData) {
						if (groupData.admin == req.session.user) {
							console.log("admin - true");
							isInGroup = true;
						} else {
							groupData.members.forEach(function(member) {
								if (member.id == req.session.user) {
								 console.log("member - true");
								 isInGroup = true;
							 }
							});
						}
					}
					console.log(isInGroup);
					if (isInGroup == true) {
						return res.view('group/post', {post: postData});
					}
					else {
						res.view('error', {error: 'User Not In Group!'});
					}
				})
				.fail(function(err) {
					res.view('error', {error: 'Error With Finding Post!'});
				})
			;
		}
		else {
			res.view('error', {error: 'User Not Logged In, Or No Group / Post ID!'});
		}
	},
};
