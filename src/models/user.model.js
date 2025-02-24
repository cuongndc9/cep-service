import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'images',
          key: 'id'
        }
      },
      phone: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: true,
      },
      gender: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dob: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true
      },
      contactAddress: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      permanentAddress: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      nationalId: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    }, {
      sequelize,
      modelName: 'users'
    });
  }

  static associate(models) {
    this.hasOne(models.Account, {
      as: 'account',
      foreignKey: 'userId'
    });
    this.hasOne(models.Agent, {
      as: 'agent',
      foreignKey: 'userId'
    });
    this.hasMany(models.Family, {
      as: 'family',
      foreignKey: 'headOfFamily'
    })
    this.hasMany(models.Relationship, {
      as: 'relationshipUserId1',
      foreignKey: 'userId1'
    });
    this.hasMany(models.Relationship, {
      as: 'relationshipUserId2',
      foreignKey: 'userId2'
    });
    this.hasMany(models.Category, {
      as: 'categoryCreatedBy',
      foreignKey: 'createdBy'
    });
    this.hasMany(models.Category, {
      as: 'categoryUpdatedBy',
      foreignKey: 'updatedBy'
    });
    this.hasMany(models.Post, {
      as: 'postCreatedBy',
      foreignKey: 'createdBy'
    });
    this.hasMany(models.Post, {
      as: 'postUpdatedBy',
      foreignKey: 'updatedBy'
    });
    this.hasMany(models.PostImage, {
      as: 'postImageCreatedBy',
      foreignKey: 'createdBy'
    });
    this.hasMany(models.PostImage, {
      as: 'postImageUpdatedBy',
      foreignKey: 'updatedBy'
    });
    this.hasMany(models.Image, {
      as: 'imageCreatedBy',
      foreignKey: 'createdBy'
    });
    this.hasMany(models.Image, {
      as: 'imageUpdatedBy',
      foreignKey: 'updatedBy'
    });
    this.hasMany(models.Faq, {
      as: 'faqCreatedBy',
      foreignKey: 'createdBy'
    });
    this.hasMany(models.Faq, {
      as: 'faqUpdatedBy',
      foreignKey: 'updatedBy'
    });
    this.hasMany(models.Activity, {
      as: 'activityCreatedBy',
      foreignKey: 'createdBy'
    });
    this.hasMany(models.Activity, {
      as: 'activityUpdatedBy',
      foreignKey: 'updatedBy'
    });
    this.hasMany(models.DiaryNote, {
      as: 'diaryNoteCreatedBy',
      foreignKey: 'createdBy'
    });
    this.hasMany(models.DiaryNote, {
      as: 'diaryNoteUpdatedBy',
      foreignKey: 'updatedBy'
    });
    this.belongsTo(models.Image, {
      foreignKey: 'imageId'
    });
  }
}

export default User;
