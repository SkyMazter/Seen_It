import sequelize from "../connection";
import Post from "./posts";
import User from "./users";

const models = { Post, User };

export { sequelize, models };
