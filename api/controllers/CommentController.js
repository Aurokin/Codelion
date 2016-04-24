/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	deleteComment: function(req, res) {
		var commentID = req.body.commentID;
		var groupID = req.body.groupID;
		if (req.session.user) {
			// User Logged In
			Comment.findOne(commentID).exec(function(err, comment) {
				if (err) {
					// Error!
					res.json({success: "false", error: "Error Looking For Comment!"});
				} else if (comment) {
					// Comment Found
					if (comment.author == req.session.user) {
						// Author Is User, Delete Comment!
						Comment.destroy(commentID).exec(function (err) {
							if (err) {
								res.json({success: "false", error: "Error Deleting Comment!"});
							} else {
								res.json({success: "true"});
							}
						});
					} else {
						Group.findOne({where: {id: groupID, admin: req.session.user}}).exec(function(err, group) {
							if (err) {
								// Error!
								res.json({success: "false", error: "Error Looking For Group!"});
							} else if (group[0]) {
								// Group Found, Delete Comment!
								Comment.destroy(commentID).exec(function (err) {
									if (err) {
										res.json({success: "false", error: "Error Deleting Comment!"});
									} else {
										res.json({success: "true"});
									}
								});
							} else {
								// Group Not Found, User Not Admin Of Group!
								res.json({success: "false", error: "User Not Admin Or Author!"});
							}
						});
					}
				} else {
					// No Comment Found!
					res.json({success: "false", error: "Comment Not Found!"});
				}
			});
		} else {
			// User Not Logged On
			res.json({success: "false", error: "User Not Logged In!"});
		}
	},
};
