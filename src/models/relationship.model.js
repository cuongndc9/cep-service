import { Model, DataTypes } from 'sequelize';

class Relationship extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      familyId: {
        type: DataTypes.UUID,
        references: {
          model: 'families',
          key: 'id'
        },
        allowNull: true,
      },
      userId1: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      userId2: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      relationship: {
        type: DataTypes.TEXT, // FIXME: ENUM
        allowNull: true,
      },
      roleType1: {
        type: DataTypes.UUID,
        references: {
          model: 'role_types',
          key: 'id'
        },
        allowNull: true,
      },
      roleType2: {
        type: DataTypes.UUID,
        references: {
          model: 'role_types',
          key: 'id'
        },
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'relationships'
    });
  }

  static associate(models) {
    this.belongsTo(models.Family, {
      foreignKey: 'familyId'
    })
    this.belongsTo(models.User, {
      as: 'user1',
      foreignKey: 'userId1'
    });
    this.belongsTo(models.User, {
      as: 'user2',
      foreignKey: 'userId2'
    });
    this.belongsTo(models.RoleType, {
      as: 'role1',
      foreignKey: 'roleType1'
    });
    this.belongsTo(models.RoleType, {
      as: 'role2',
      foreignKey: 'roleType2'
    });
  }
}

export default Relationship;
