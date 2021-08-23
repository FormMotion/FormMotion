const Sequelize = require('sequelize');
const db = require('./database');

const Post = db.define('image', {
  dataUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Post;
