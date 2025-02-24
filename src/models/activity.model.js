import { Model, DataTypes } from 'sequelize';

class Activity extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      imageId: {
        type: DataTypes.UUID,
        references: {
          model: 'images',
          key: 'id'
        },
        allowNull: true
      },
      name: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.TEXT, // FIXME: ENUM
        allowNull: true,
      },
      shortDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      longDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      keyword: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      source: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      modelName: 'activities'
    });
  }

  static associate(models) {
    this.hasMany(models.FamilyActivity, {
      foreignKey: 'activityId'
    })
    this.hasMany(models.DiaryNote, {
      foreignKey: 'activityId'
    })
    this.belongsTo(models.Image, {
      foreignKey: 'imageId'
    })
  }
}

export default Activity
