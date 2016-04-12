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
      required: true,
    },
    lName: {
      type: 'string',
      required: true,
    },
    userName: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    bio: {
      type: 'string',
    },
    email: {
      type: 'string',
      unique: true,
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
