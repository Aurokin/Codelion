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
				Group.findOne(groupID).populate('members').exec(function(err, group) {
					if (err) {
						res.view('error', {error: 'Group Error'});
					}
					else {
						console.log(group);
						console.log("^ printed from PostController");
						if (group) {
							if (group.admin == req.session.user) {
								res.view('group/createPost', {group: group});
							} else {
								var isMember = false;
								group.members.forEach(function(member) {
									if (member.id == req.session.user) {
										isMember = true;
									}
								});
								if (isMember == true) {
									res.view('group/createPost', {group: group});
								} else {
									res.view('error', {error: 'You Are Not An Admin/Member!'});
								}
							}
						} else {
							res.view('error', {error: 'Group Not Found'});
						}
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
					var commentData = Comment.find({post: postID}).populate('author')
						.then(function(commentData) {
							return commentData;
						})
					;
					return [postData, groupData, commentData];
				})
				.spread(function(postData, groupData, commentData) {
					console.log(postData);
					console.log(groupData);
					console.log(commentData)
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
						return res.view('group/post', {post: postData, comments: commentData, group: groupData});
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
	deletePost: function(req, res) {
		var postID = req.body.postID;
		var groupID = req.body.groupID;
		if (req.session.user && postID && groupID) {
			Post.findOne(postID).exec(function(err, post) {
				if (err) {
					// Post Error!
					res.json({success: "false", error: "Error Looking For Post!"});
				} else if (post) {
					if (post.author == req.session.user) {
						// Author Is User, Delete Post!
						Post.destroy(postID).exec(function (err) {
							if (err) {
								res.json({success: "false", error: "Error Destroying Post!"});
							} else {
									res.json({success: "true"});
							}
						});
					} else {
						Group.findOne({where: {id: groupID, admin: req.session.user}}).exec(function(err, group) {
							if (err) {
								// Group Error
								res.json({success: "false", error: "Error Looking For Group!"});
							} else if (group) {
								// User Is Admin! Delete Post!
								Post.destroy(postID).exec(function (err) {
									if (err) {
										res.json({success: "false", error: "Error Destroying Post!"});
									} else {
											res.json({success: "true"});
									}
								});
							} else {
								// Group Not Found!
								res.json({success: "false", error: "User Is Not Admin Or Author!"});
							}
						});
					}
				} else {
					// Post Not Found!
					res.json({success: "false", error: "Post Not Found!"});
				}
			});
		} else {
			//User Not Logged In, No Post ID, Or No Group ID
			res.json({success: "false", error: "User Not Logged In, Or Missing Post / Group ID!"});
		}
	},
};
