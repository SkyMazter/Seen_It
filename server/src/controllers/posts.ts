import { Request, Response } from "express";
import Post from "../models/posts";

interface PostStruct {
  userId: number;
  title: string;
  category: string;
  fileName: string;
  description: string;
  filePath: string;
}

//helper function
const handleEmpty = (
  userId: number,
  title: string,
  category: string,
  description: string,
  fileName: string,
  filePath: string
): string | undefined => {
  if (userId == null) {
    return "userId";
  } else if (title == "") {
    return "title";
  } else if (category == "") {
    return "category";
  } else if (description == "") {
    return "description";
  } else if (fileName == "") {
    return "fileName";
  } else if (filePath == "") {
    return "filePath";
  }
};

const newPost = async (req: Request, res: Response) => {
  const {
    userId,
    title,
    category,
    fileName,
    description,
    filePath,
  }: PostStruct = req.body;

  const errorMessage: string | undefined = handleEmpty(
    userId,
    title,
    category,
    fileName,
    description,
    filePath
  );

  if (errorMessage) {
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
      filePath: filePath,
    });

    res.status(200);
    return res.json({
      success: "New Post created!",
      userId: userId,
      title: title,
      category: category,
      fileName: fileName,
      description: description,
      filePath: filePath,
    });
  } catch (error) {
    res.status(400);
    return res.json({
      error: `failed to create new post due to unknown error`,
    });
  }
};

const getAllPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts = await Post.findAll();
    return res.json(posts); // ✅ Always return a response
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" }); // ✅ Ensures all paths return a Response
  }
};

export { newPost, getAllPosts };
