'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {foreignKey: "authorId"})
      Post.belongsTo(models.Category, {foreignKey: "categoryId"})
      Post.hasMany(models.Tag, {foreignKey: "postId"})
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    authorMongoId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.addHook("beforeCreate", (post, options) => {
    post.slug = post.title.split(" ").join("-")
  })

  Post.addHook("beforeUpdate", (post, options) => {
    post.slug = post.title.split(" ").join("-")
  })
  return Post;
};