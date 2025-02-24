import { Model, DataTypes } from 'sequelize';

class RoleType extends Model {
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
      description: {
        type: DataTypes.TEXT,
      },
    }, {
      sequelize,
      modelName: 'role_types'
    });
  }

  static associate(models) {
    this.hasMany(models.Relationship, {
      as: 'relationshipRoleType1',
      foreignKey: 'roleType1'
    });
    this.hasMany(models.Relationship, {
      as: 'relationshipRoleType2',
      foreignKey: 'roleType2'
    });
  }
}

export default RoleType
