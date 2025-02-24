import { Op } from 'sequelize';
import { uniq, flatten } from 'lodash';

import db from '../models';
import { DIARY_FILTER, POLICY } from '../components/constants';

class DiaryNoteService {
  static async getDiaryNotes(data) {
    const {
      offset, limit, userId, filter,
    } = data;
    let diariesByAccount;
    let diariesByRelative;
    if (filter === DIARY_FILTER.byAccount || filter === DIARY_FILTER.all) {
      diariesByAccount = await db.DiaryNote.findAndCountAll({
        where: {
          createdBy: userId,
        },
        limit,
        offset,
      });
      if (filter === DIARY_FILTER.byAccount) {
        return {
          byAccount: diariesByAccount,
        };
      }
    }
    const relationships = await db.Relationship.findAll({
      where: {
        [Op.or]: [
          {
            userId1: userId,
          },
          {
            userId2: userId,
          },
        ],
      },
      attributes: ['userId1', 'userId2'],
    });
    const relativeIds = uniq(
      flatten(
        relationships.map((item) => [item.userId1, item.userId2]),
      ),
    ).filter((item) => item !== userId);
    if (filter === DIARY_FILTER.byRelative || filter === DIARY_FILTER.all) {
      diariesByRelative = await db.DiaryNote.findAndCountAll({
        where: {
          createdBy: {
            [Op.in]: relativeIds,
          },
          policy: POLICY.public,
        },
        limit,
        offset,
      });
      if (filter === DIARY_FILTER.byRelative) {
        return {
          byRelative: diariesByRelative,
        };
      }
    }
    return {
      byAccount: diariesByAccount,
      byRelative: diariesByRelative,
    };
  }

  static createDiaryNote(data) {
    return db.DiaryNote.create({ ...data });
  }

  static async updateDiaryNote(data) {
    const { id, ...otherData } = data;
    const diaryNote = await db.DiaryNote.findOne(
      {
        where: {
          id,
        },
      },
    );
    await diaryNote.update({
      ...otherData,
    });
    return diaryNote;
  }
}

export default DiaryNoteService;
