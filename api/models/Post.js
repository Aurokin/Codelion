/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    question: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'datetime',
    },
    author: {
      model: 'user',
      required: true,
    },
    group: {
      model: 'group',
      required: true,
    },
    comments: {
      collection: 'comment',
      via: 'post',
    }
  }
};
