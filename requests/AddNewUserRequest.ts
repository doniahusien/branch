import { Request } from 'express';
import { User } from '../models/User';

export type AddNewUserRequest = Request<
  {},
  User,
  {
    name: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
    dateOfBirth: string;
    profileImage?: string;
  }
>;