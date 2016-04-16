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
};
