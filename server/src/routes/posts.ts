import express from "express";
import { newPost, getAllPosts } from "../controllers/posts";

const router: express.Router = express.Router();

router.post("/new", newPost);
router.get("/all", getAllPosts);

export default router;
