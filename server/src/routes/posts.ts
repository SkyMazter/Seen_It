import express from "express";
import { newPost, getAllPosts, getLast50Posts } from "../controllers/posts";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const router: express.Router = express.Router();

router.post("/new", upload.single("file"), newPost);
router.get("/all", getAllPosts);
router.get("/last", getLast50Posts);

export default router;
