const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//User to post relationship
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//User to comment relationship 
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//Post to comment relationship
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'  
});

module.exports = { User, Post, Comment };