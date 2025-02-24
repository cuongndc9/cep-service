import { Model, DataTypes } from 'sequelize';

class Family extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.TEXT,
      },
      headOfFamily: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    }, {
      sequelize,
      modelName: 'families'
    });
  }

  static associate(models) {
    this.hasMany(models.FamilyActivity, {
      foreignKey: 'familyId'
    })
    this.hasMany(models.Relationship, {
      foreignKey: 'familyId'
    });
    this.belongsTo(models.User, {
      foreignKey: 'headOfFamily'
    });
  }
}

export default Family;
