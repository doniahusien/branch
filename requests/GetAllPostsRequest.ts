import { Request } from 'express';
import { Post } from '../models/post';

export type GetAllPostsRequest = Request<
  {},
  Post[],
  {},
  { search?: string }
>;