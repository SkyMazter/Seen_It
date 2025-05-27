import { DataTypes, HasMany, Model } from "sequelize";
import sequelize from "../connection";
import Comment from "./comment";

class Post extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public username!: string;
  public category!: string;
  public fileName!: string;
  public description!: string;
  public filePath!: string;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    timestamps: true,
  }
);

Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

export default Post;
