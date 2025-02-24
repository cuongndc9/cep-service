import joi from 'joi';

import { middleware, validateSchema, validateToken } from '../components/middlewares';
import { ROLE } from '../components/constants';
import Service from '../services/post.service';

const resolver = {
  Query: {
    posts: middleware(
      validateToken(ROLE.admin),
      validateSchema({
        offset: joi.number().default(0),
        limit: joi.number().default(10),
      }),
      (_, args, { user }) => Service.getPosts({
        ...args,
        userId: user.userId,
      }),
    ),
  },
  Mutation: {
    createPost: middleware(
      validateToken(ROLE.admin),
      (_, args, { user }) => Service.createPost({
        ...args,
        createdBy: user.userId,
        updatedBy: user.userId,
      }),
    ),
  },
};

export default resolver;
