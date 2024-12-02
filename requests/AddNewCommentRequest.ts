import { Request } from 'express';
import { Comment } from '../models/comment';

export type AddNewCommentRequest = Request<
  {},
  Comment,
  {
    content: string;
    postId: string;
    userId: string;
    isEdited?: boolean;
  }
>;