import db from '../models';

class PostService {
  static getPosts({
    userId, categoryId, offset, limit,
  }) {
    return db.Post.findAndCountAll({
      where: {
        createdBy: userId,
        categoryId,
      },
      offset,
      limit,
    });
  }

  static createPost(data) {
    return db.Post.create(data);
  }
}

export default PostService;
