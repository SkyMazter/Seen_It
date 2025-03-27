import { Request, Response } from "express";
import Post from "../models/posts";

const newPost = async (req: Request, res: Response) => {
  const {
    userId,
    title,
    category,
    fileName,
    description,
  }: {
    userId: number;
    title: string;
    category: string;
    fileName: string;
    description: string;
  } = req.body;

  var handleEmpty: string = "";
  handleEmpty = !userId
    ? "userId"
    : "" || !title
    ? "title"
    : "" || !category
    ? "category"
    : "" || !fileName
    ? "fileName"
    : "" || !description
    ? "description"
    : "";

  if (handleEmpty) {
    res.status(400);
    return res.json({ error: `Failed to login missing field: ${handleEmpty}` });
  }

  try {
    await Post.create({
      userId: userId,
      title: title,
      category: category,
      fileName: fileName,
      description: description,
    });

    res.status(200);
    return res.json({
      success: "New user created!",
      userId: userId,
      title: title,
      category: category,
      fileName: fileName,
      description: description,
    });

  } catch (error) {
    res.status(400);
    return res.json({
      error: `failed to create new post due to unknown error`,
    });
  }
};

export {newPost};