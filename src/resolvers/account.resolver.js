import joi from 'joi';

import { middleware, validateSchema } from '../components/middlewares';
import AccountService from '../services/account.service';

const resolver = {
  Query: {
    login: (_, args) => AccountService.login(args),
  },
  Mutation: {
    register: (_, args) => AccountService.register(args),
  },
};

export default resolver;
