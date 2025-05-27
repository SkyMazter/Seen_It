import sequelize from "../connection";
import Post from "./posts";
import User from "./users";
import Comment from "./comment";

const models = { Post, User, Comment };

export { sequelize, models };
