import { Model, DataTypes } from 'sequelize';

class Agent extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      referenceId: {
        type: DataTypes.UUID,
        references: {
          model: 'agents',
          key: 'id'
        }
      },
      roles: {
        type: DataTypes.TEXT, // FIXME: ENUM
        allowNull: true,
      },
      official: {
        type: DataTypes.TEXT,
      },
      room: {
        type: DataTypes.TEXT,
      },
      officialAddress: {
        type: DataTypes.TEXT,
      },
      officialPhone: {
        type: DataTypes.TEXT,
      },
    }, {
      sequelize,
      modelName: 'agents'
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    this.hasOne(models.Agent, {
      foreignKey: 'referenceId',
    });
  }
}

export default Agent;
