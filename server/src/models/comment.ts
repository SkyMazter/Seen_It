import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import Post from "./posts";

class Comment extends Model {
  public id!: number;
  public userId!: number;
  public text!: string;
  public likes!: Record<string, boolean>;
  public dislikes!: Record<string, boolean>;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    likes: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
    dislikes: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true,
  }
);
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });
export default Comment;
