import { Model, DataTypes } from 'sequelize';

class PostImage extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      postId: {
        type: DataTypes.UUID,
        references: {
          model: 'posts',
          key: 'id'
        }
      },
      imageId: {
        type: DataTypes.UUID,
        references: {
          model: 'images',
          key: 'id'
        }
      },
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      updatedBy: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    }, {
      sequelize,
      modelName: 'post_images'
    });
  }

  static associate(models) {
    this.belongsTo(models.Post, {
      foreignKey: 'postId'
    });
    this.belongsTo(models.Image, {
      foreignKey: 'imageId'
    });
  }
}

export default PostImage;
