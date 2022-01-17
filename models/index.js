const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Comment, {
    foreignKey: 'user_id',
});
User.hasMany(Post, {
    foreignKey: 'user_id',
})

Post.belongsTo({
    foreignKey: 'post_id',
})

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Comment };
