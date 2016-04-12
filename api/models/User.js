/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    fName: {
      type: 'string',
    },
    lName: {
      type: 'string',
    },
    userName: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    bio: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    admins: {
      collection: 'group',
      via: 'admin',
    },
    groups: {
      collection: 'group',
      via: 'members',
    },
    posts: {
      collection: 'post',
      via: 'author',
    },
    comments: {
      collection: 'comment',
      via: 'author',
    }
  },
  beforeCreate: function (attrs, cb)
  {
    bcrypt.genSalt(10, function(err, salt)
      {
        if (err) return cb(err);
        bcrypt.hash(attrs.password, salt, function(err, hash)
          {
            if (err) return cb(err);
            attrs.password = hash;
            cb();
          });
      });
 }
};
