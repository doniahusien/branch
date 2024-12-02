import { Request } from 'express';
import { Post } from '../models/post';

export type AddNewPostRequest = Request<
  {},
  Post,
  {
    content: string;
    userId: string;
  }
>;