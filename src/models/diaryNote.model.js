import { Model, DataTypes } from 'sequelize';

import { POLICY } from '../components/constants';

class DiaryNote extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      activityId: {
        type: DataTypes.UUID,
        references: {
          model: 'activities',
          key: 'id'
        },
        allowNull: true
      },
      imageId: {
        type: DataTypes.UUID,
        references: {
          model: 'images',
          key: 'id'
        },
        allowNull: true
      },
      refId: {
        type: DataTypes.UUID,
        references: {
          model: 'diary_notes',
          key: 'id'
        },
        allowNull: true
      },
      status: {
        type: DataTypes.TEXT, // FIXME: ENUM
        allowNull: true,
      },
      policy: {
        type: DataTypes.ENUM(POLICY.public, POLICY.private),
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
      modelName: 'diary_notes'
    });
  }

  static associate(models) {
    this.hasOne(models.DiaryNote, {
      foreignKey: 'refId'
    })
    this.belongsTo(models.Image, {
      foreignKey: 'imageId'
    })
    this.belongsTo(models.Activity, {
      foreignKey: 'activityId'
    })
  }
}

export default DiaryNote;
