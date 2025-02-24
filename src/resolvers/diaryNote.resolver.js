import joi from 'joi';

import { middleware, validateSchema, validateToken } from '../components/middlewares';
import DiaryNoteService from '../services/diaryNote.service';
import { ROLE } from '../components/constants';

const resolver = {
  Query: {
    diaryNotes: middleware(
      validateToken(ROLE.admin),
      validateSchema({
        offset: joi.number().default(0),
        limit: joi.number().default(10),
      }),
      (_, args, { user }) => DiaryNoteService.getDiaryNotes({
        ...args,
        userId: user.userId,
      }),
    ),
  },
  Mutation: {
    createDiaryNote: middleware(
      validateToken(ROLE.admin),
      (_, args, { user }) => DiaryNoteService.createDiaryNote({
        ...args,
        createdBy: user.userId,
        updatedBy: user.userId,
      }),
    ),
    updateDiaryNote: middleware(
      validateToken(ROLE.admin),
      (_, args) => DiaryNoteService.updateDiaryNote({
        ...args,
      }),
    ),
  },
};

export default resolver;
