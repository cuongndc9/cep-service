import { Model, DataTypes } from 'sequelize';

class Image extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      publicId: {
        type: DataTypes.TEXT,
      },
      url: {
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
      modelName: 'images'
    });
  }

  static associate(models) {
    this.hasMany(models.PostImage, {
      as: 'postImage',
      foreignKey: 'imageId'
    });
    this.hasOne(models.User, {
      as: 'user',
      foreignKey: 'imageId'
    });
    this.hasMany(models.Activity, {
      foreignKey: 'imageId'
    });
    this.hasOne(models.DiaryNote, {
      foreignKey: 'imageId'
    });
  }
}

export default Image
