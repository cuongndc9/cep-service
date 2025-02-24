import { Model, DataTypes } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      categoryId: {
        type: DataTypes.UUID,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      title: {
        type: DataTypes.TEXT,
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      longDescription: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      thumbnail: {
        type: DataTypes.UUID,
        references: {
          model: 'images',
          key: 'id'
        }
      },
      keyword: {
        type: DataTypes.TEXT,
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
      modelName: 'posts'
    });
  }

  static associate(models) {
    this.hasMany(models.PostImage, {
      foreignKey: 'postId'
    });
    this.belongsTo(models.Image, {
      foreignKey: 'thumbnail'
    });
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
  }
}

export default Post
