/**
* Group.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
    },
    about: {
      type: 'string',
    },
    admin: {
      model: 'user'
    },
    members: {
      collection: 'user',
      via: 'groups',
      dominant: true
    },
    posts: {
      collection: 'post',
      via: 'group',
    }
  }
};
