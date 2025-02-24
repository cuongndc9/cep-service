import { Op } from 'sequelize';

import db from '../models';
import { ExistsError, NotFoundError } from '../components/errors';

class RelationshipService {
  static getRelationships(userId) {
    return db.Relationship.findAll({
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
      include: [
        {
          model: db.User,
          as: 'user1',
        },
        {
          model: db.User,
          as: 'user2',
        },
      ],
    });
  }

  static async addRelationship({ phone1, phone2, relationship }) {
    const user1 = await db.User.findOne({ where: { phone: phone1 } });
    const user2 = await db.User.findOne({ where: { phone: phone2 } });
    if (!user1 || !user2) {
      throw new NotFoundError('Không tìm thấy tài khoản với số điện thoại đã cung cấp');
    }
    const relationships = await db.Relationship.findAll({
      where: {
        [Op.or]: [
          {
            userId1: user1.id,
            userId2: user2.id,
          },
          {
            userId1: user2.id,
            userId2: user1.id,
          },
        ],
      },
    });
    if (relationships.length > 0) {
      throw new ExistsError('Mối quan hệ đã tồn tại');
    }
    return db.Relationship.create({
      userId1: user1.id,
      userId2: user2.id,
      relationship,
    });
  }

  static async removeRelationship({ phone1, phone2 }) {
    const user1 = await db.User.findOne({ where: { phone: phone1 } });
    const user2 = await db.User.findOne({ where: { phone: phone2 } });
    if (!user1 || !user2) {
      throw new NotFoundError('Không tìm thấy tài khoản với số điện thoại đã cung cấp');
    }
    return db.Relationship.destroy({
      where: {
        [Op.or]: [
          {
            userId1: user1.id,
            userId2: user2.id,
          },
          {
            userId1: user2.id,
            userId2: user1.id,
          },
        ],
      },
    });
  }
}

export default RelationshipService;
