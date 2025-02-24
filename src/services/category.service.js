import db from '../models';

class CategoryService {
  static getCategories({ userId, offset, limit }) {
    return db.Category.findAndCountAll({
      where: {
        createdBy: userId,
      },
      offset,
      limit,
    });
  }

  static createCategory(data) {
    return db.Category.create(data);
  }
}

export default CategoryService;
