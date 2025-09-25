import express from 'express';
import { createPostController } from '../controller/Post.js';
import { getPostController, getAllPostController } from '../controller/Post.js';
import { updatePostController } from '../controller/Post.js';
import { deletePostController } from '../controller/Post.js';


const routes = express.Router();

routes.post('/create-post', createPostController);
routes.get("/get-post/:slug", getPostController);
routes.get("/get-all-posts", getAllPostController);
routes.put("/update-post/:id",updatePostController);
routes.delete("/delete-post/:id", deletePostController);

  


// Define your post routes here

export default routes;

