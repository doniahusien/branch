import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { User } from '../models/User';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { JsonHelper } from '../helpers/jsonHelper';
import { AddNewPostRequest } from '../requests/AddNewPostRequest';
import { GetAllPostsRequest } from '../requests/GetAllPostsRequest';
import { AddNewCommentRequest } from '../requests/AddNewCommentRequest';
import { GetAllCommentsRequest } from '../requests/GetAllCommentRequest';
import { AddNewUserRequest } from '../requests/AddNewUserRequest';
import { GetAllUsersRequest } from '../requests/GetAllUsersRequest';

const app = express();
const PORT = 3500;

const db = {
  users: JsonHelper.read<User[]>('data/users.json'),
  posts: JsonHelper.read<Post[]>('data/posts.json'),
  comments: JsonHelper.read<Comment[]>('data/comments.json'),
};

app.use(json());

// Create a new User
app.post('/api/users', (req: Request, res: Response) => {
  const { name, email, password, gender, dateOfBirth, profileImage } = req.body as AddNewUserRequest;

  // Validate gender
  if (gender !== 'male' && gender !== 'female') {
    return res.status(400).json({ message: 'Invalid gender' });
  }

  const newUser: User = {
    _id: (db.users.length ? (parseInt(db.users[db.users.length - 1]._id) + 1).toString() : '1')
    name,
    email,
    password,
    gender,
    dateOfBirth: new Date(dateOfBirth),
    createdAt: new Date(),
    profileImage,
  };

  db.users.push(newUser);
  JsonHelper.write<User[]>('data/users.json', db.users);

  res.json(newUser);
});

// Get all Users
app.get('/api/users', (req: Request, res: Response) => {
  const { search } = req.query as GetAllUsersRequest;
  let result: User[] = [...db.users];

  if (search) {
    result = result.filter(u => u.name.includes(search) || u.email.includes(search));
  }

  res.json(result);
});

// Get a User by ID
app.get('/api/users/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const user = db.users.find(u => u._id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// Update a User by ID
app.put('/api/users/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const userIndex = db.users.findIndex(u => u._id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = req.body as Partial<User>;

  const user = db.users[userIndex];
  db.users[userIndex] = { ...user, ...updatedUser };
  
  JsonHelper.write<User[]>('data/users.json', db.users);

  res.json(db.users[userIndex]);
});

// Delete a User by ID
app.delete('/api/users/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const userIndex = db.users.findIndex(u => u._id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const [deletedUser] = db.users.splice(userIndex, 1);
  JsonHelper.write<User[]>('data/users.json', db.users);

  res.status(200).json(deletedUser);
});

// Create a new Post
app.post('/api/posts', (req: Request, res: Response) => {
  const { content, userId } = req.body as AddNewPostRequest;

  const newPost: Post = {
    _id: (db.posts.length ? (parseInt(db.posts[db.posts.length - 1]._id) + 1).toString() : '1'),
    content,
    createdAt: new Date(),
    userId,
    reactions: {
      like: 0,
      love: 0,
      haha: 0,
      sad: 0,
      angry: 0,
    },
  };

  db.posts.push(newPost);
  JsonHelper.write<Post[]>('data/posts.json', db.posts);

  res.json(newPost);
});

// Update Post reactions
app.put('/api/posts/:id/reaction', (req: Request<{ id: string }>, res: Response) => {
  const postId = req.params.id;
  const post = db.posts.find(p => p._id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const { reactionType } = req.body;

  switch (reactionType) {
    case 'like':
      post.reactions.like += 1;
      break;
    case 'love':
      post.reactions.love += 1;
      break;
    case 'haha':
      post.reactions.haha += 1;
      break;
    case 'sad':
      post.reactions.sad += 1;
      break;
    case 'angry':
      post.reactions.angry += 1;
      break;
    default:
      return res.status(400).json({ message: 'Invalid reaction type' });
  }

  JsonHelper.write<Post[]>('data/posts.json', db.posts);
  res.json(post);
});

// Create a new Comment
app.post('/api/comments', (req: Request, res: Response) => {
  const { content, postId, userId, isEdited } = req.body as AddNewCommentRequest;

  const newComment: Comment = {
    _id: (db.comments.length ? (parseInt(db.comments[db.comments.length - 1]._id) + 1).toString() : '1'),
    content,
    createdAt: new Date(),
    postId,
    userId,
    isEdited: isEdited || false,
  };

  db.comments.push(newComment);
  JsonHelper.write<Comment[]>('data/comments.json', db.comments);

  res.json(newComment);
});

// Get all Comments for a Post
app.get('/api/comments', (req: Request, res: Response) => {
  const postId = req.query.postId as string;
  const comments = db.comments.filter(c => c.postId === postId);
  res.json(comments);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});