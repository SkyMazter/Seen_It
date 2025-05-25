import express from "express";
import {
  newPost,
  getAllPosts,
  getLastPosts,
  getFilteredPosts,
  getSearchResult,
} from "../controllers/posts";
import multer from "multer";
import { Request as MulterRequest } from "express-serve-static-core";

const storage = multer.diskStorage({
  destination: (
    req: MulterRequest,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "uploads/");
  },
  filename: (
    req: MulterRequest,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const router: express.Router = express.Router();

router.post("/new", upload.single("file"), newPost);
router.get("/all", getAllPosts);
router.get("/last", getLastPosts);
router.get("/filter", getFilteredPosts);
router.get("/search", getSearchResult);

export default router;
