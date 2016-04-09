/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    fName: {
      type: 'string',
    },
    lName: {
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
  }
};
