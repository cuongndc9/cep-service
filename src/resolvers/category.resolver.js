import joi from 'joi';

import { middleware, validateSchema, validateToken } from '../components/middlewares';
import { ROLE } from '../components/constants';
import Service from '../services/category.service';

const resolver = {
  Query: {
    categories: middleware(
      validateToken(ROLE.admin),
      validateSchema({
        offset: joi.number().default(0),
        limit: joi.number().default(10),
      }),
      (_, args, { user }) => Service.getCategories({
        ...args,
        userId: user.userId,
      }),
    ),
  },
  Mutation: {
    createCategory: middleware(
      validateToken(ROLE.admin),
      (_, args, { user }) => Service.createCategory({
        ...args,
        createdBy: user.userId,
        updatedBy: user.userId,
      }),
    ),
  },
};

export default resolver;
