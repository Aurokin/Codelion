/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	all: function(req, res) {
		Group.find({}, function(err, groups) {
			if (err) {
				res.view('error', {error: 'Group Error'});
			}
			else {
				console.log(groups);
				res.view('group/listAll', {groups: groups});
			}
		});
	},
	groupManagement: function(req, res) {
		var groupID = req.param('id');
		if (req.session.user) {
			if (groupID) {
				Group.find({where: {admin: req.session.user, id: groupID}}).populate('members').exec(function(err, group) {
					if (err) {
						res.view('error', {error: 'Group Error'});
					}
					else {
						console.log(group);
						if (group[0]) {
							res.view('group/addMember', {group: group});
						} else {
							res.view('error', {error: 'Group Not Found, Or You Are Not An Admin!'});
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
	addMember: function(req, res) {
		var memberName = req.body.memberName;
		var groupID = req.body.groupID;
		if (memberName && groupID) {
			Group.findOne(groupID).exec(function(err, group) {
				if (err) {
					res.json({success: 'false', error: 'Group Error'});
				}
				else if (group) {
					User.findOne({where: {userName: memberName}}).exec(function(err, user) {
						if (err) {
							res.json({success: 'false', error: 'User Error'});
						}
						else if (user) {
							group.members.add(user);
							group.save(function(err){
								if (err) {
									res.json({success: 'false', error: 'Error Saving Group With Member (Most Likely Member In Group)'});
								}
								else {
									res.json({success: 'true', groupID: groupID, memberName: memberName});
								}
							});
						}
						else {
							res.json({success: 'false', error: 'No User Found'});
						}
					});
				}
				else {
					res.json({success: 'false', error: 'No Group Found'});
				}
			});
		} else {
			res.json({success: 'false', error: 'No MemberName Or Group ID'});
		}
	},
	removeMember: function(req, res) {
		var memberID = req.body.memberID;
		var groupID = req.body.groupID;
		if (memberID && groupID) {
			Group.findOne(groupID).exec(function(err, group) {
				if (err) {
					res.json({success: 'false', error: 'Group Error'});
				}
				else if (group) {
					group.members.remove(memberID);
					group.save(function(err){
						if (err) {
							res.json({success: 'false', error: 'Error Removing Member From Group (Most Likely Member Is Not In Group)'});
						}
						else {
							res.json({success: 'true', groupID: groupID, memberID: memberID});
						}
					});
				}
				else {
					res.json({success: 'false', error: 'No Group Found'});
				}
			});
		} else {
			res.json({success: 'false', error: 'No MemberID Or Group ID'});
		}
	},
};
