import express, { query, Request, Response } from 'express';
import { CreatePostController } from '../UseCases/CreatePost/CreatePostController';
import { DeletePostController } from '../UseCases/DeletePost/DeletePostController';
import { AddCommentController } from '../UseCases/AddComments/AddCommentController';
import { GetPostController } from '../UseCases/GetPost/GetPostController';
import axios from 'axios';
import { PORT } from '../../config.json';
import { GetCommentsController } from '../UseCases/GetComments/GetCommentsController';

// import { AddPostController } from '../UseCases/AddPostBanner/AddPostBannerController';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const skip = 0;
  const take = 4;

  try {
    const response = await axios.get(`http://localhost:${PORT}/get-posts`, {
      params: { skip, take },
    });
    const posts = response.data;
    const data = posts.message;

    // const format = (data.createdAt = datefns.format(
    //   new Date(data.createdAt),
    //   'dd/MM/yyyy HH:mm:ss',
    // ));
    res.render('home', { data });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// router.get('/:tag', async (req: Request, res: Response) => {
//   const { tag } = req.params
// })

router.get('/blog', async (req: Request, res: Response) => {
  const { skip = 0, take = 10 } = req.query;

  try {
    const response = await axios.get(`http://localhost:${PORT}/get-posts`, {
      params: { skip, take },
    });
    const posts = response.data;
    const data = posts.message;
    res.render('blog', { data });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/post/:id', async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const response = await axios.get(
      `http://localhost:${PORT}/get-posts-id/${postId}`,
    );

    const responseComments = await axios.get(
      `http://localhost:${PORT}/get-comments/${postId}`,
    );

    const post = response.data.message;
    const comments = responseComments.data;

    console.log(post);

    res.render('post', { post, comments });
  } catch (error) {
    console.log(error);
  }
});

router.get('/search', GetPostController.getPostByTitle);

router.get('/get-posts', GetPostController.getPost);
router.get('/get-posts-id/:id', GetPostController.getPostById);
router.get('/get-comments/:id', GetCommentsController.getPostComments);

router.post('/create', CreatePostController.create);

router.post('/posts/:id', AddCommentController.add);

router.delete('/delete', DeletePostController.delete);

export { router };
