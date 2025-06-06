import { Request, Response } from "express";
import Post from "../models/posts";
import { Op } from "sequelize";

interface PostStruct {
  userId: number;
  title: string;
  username: string;
  category: string;
  description: string;
}

//helper function
const handleEmpty = (
  userId: number,
  title: string,
  username: string,
  category: string,
  description: string,
  fileName: string,
  filePath: string,
): string | undefined => {
  if (userId == null) {
    return "userId";
  } else if (title == "") {
    return "title";
  } else if (username == "") {
    return "username";
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

const newPost = async (req: Request, res: Response): Promise<Response> => {
  const { userId, title, username, category, description }: PostStruct =
    req.body;

  const fileName: string =
    req.file?.filename != undefined ? req.file!.filename : "";
  const filePath: string = req.file ? `/uploads/${req.file.filename}` : "";

  const errorMessage: string | undefined = handleEmpty(
    userId,
    title,
    username,
    category,
    fileName,
    description,
    filePath,
  );

  if (errorMessage) {
    res.status(400);
    return res.json({ error: `Failed to login missing field: ${handleEmpty}` });
  }
  const id = Number(userId);
  try {
    await Post.create({
      userId: id,
      title: title,
      username: username,
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
      username: username,
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
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getLastPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const n = parseInt(req.query.n as string) || 50;

    if (n <= 0) {
      return res
        .status(400)
        .json({ message: "Number of posts must be greater than 0" });
    }

    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      limit: n,
    });

    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFilteredPosts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const category: string = req.query.category as string;
  const n: number = parseInt(req.query.n as string) || 50;

  try {
    const posts = await Post.findAll({
      where: { category: category },
      limit: n,
    });
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSearchResult = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const search: string = req.query.search as string;

  try {
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } },
        ],
      },
    });

    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  newPost,
  getAllPosts,
  getLastPosts,
  getFilteredPosts,
  getSearchResult,
};
