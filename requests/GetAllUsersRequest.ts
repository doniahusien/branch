import { Request } from 'express';
import { User } from '../models/User';

export type GetAllUsersRequest = Request<
  {},
  User[],
  {},
  { search?: string }
>;