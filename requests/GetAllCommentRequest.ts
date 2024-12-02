import { Request } from 'express';
import { Comment } from '../models/comment';

export type GetAllCommentsRequest = Request<
  {},
  Comment[],
  {},
  { postId: string }
>;