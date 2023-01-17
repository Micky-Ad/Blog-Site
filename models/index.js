const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
  foreignKey: "user_id",
});

Comment.hasOne(User, {
  foreignKey: "user_id",
});

User.belongsTo(Comment, {
  foreignKey: "user_id",
});

module.exports = { User, Blog, Comment };