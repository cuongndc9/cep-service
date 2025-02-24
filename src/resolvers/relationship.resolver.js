import { middleware, validateToken } from '../components/middlewares';
import { ROLE } from '../components/constants';
import Service from '../services/relationship.service';

const resolver = {
  Query: {
    relationships: middleware(
      validateToken(ROLE.admin),
      (_, args, { user }) => Service.getRelationships(user.userId),
    ),
  },
  Mutation: {
    addRelationship: middleware(
      validateToken(ROLE.admin),
      (_, args) => Service.addRelationship(args),
    ),
    removeRelationship: middleware(
      validateToken(ROLE.admin),
      (_, args) => Service.removeRelationship(args),
    ),
  },
};

export default resolver;
