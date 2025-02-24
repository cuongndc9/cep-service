import { Model, DataTypes } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.UUID,
        references: {
          model: 'categories',
          key: 'id'
        },
        allowNull: true,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      orderBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      keyword: {
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
      modelName: 'categories'
    });
  }

  static associate(models) {
    this.hasMany(models.Post, {
      foreignKey: 'categoryId',
    });
    this.hasMany(models.Faq, {
      foreignKey: 'categoryId'
    })
    this.hasOne(models.Category, {
      foreignKey: 'parentId'
    });
  }
}

export default Category;
