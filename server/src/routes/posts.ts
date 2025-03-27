import express from "express";
import { newPost } from "../controllers/posts";

const router: express.Router = express.Router();

router.post("/new", newPost);

export default router;