import { Model, DataTypes } from 'sequelize';

import { ROLE } from '../components/constants';

class Account extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.TEXT,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      password: {
        type: DataTypes.TEXT,
      },
      role: {
        type: DataTypes.ENUM(ROLE.admin),
        allowNull: true,
        defaultValue: ROLE.admin
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
    }, {
      sequelize,
      modelName: 'accounts',
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  }
}

export default Account
