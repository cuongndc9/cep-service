import { Model, DataTypes } from 'sequelize';

class Faq extends Model {
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
      refId: {
        type: DataTypes.UUID,
        references: {
          model: 'faqs',
          key: 'id'
        }
      },
      question: {
        type: DataTypes.TEXT,
      },
      answer: {
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
      modelName: 'faqs'
    });
  }

  static associate(models) {
    this.hasOne(models.Faq, {
      foreignKey: 'refId'
    })
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    })
  }
}

export default Faq;
