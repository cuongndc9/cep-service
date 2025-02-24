import { Model, DataTypes } from 'sequelize';

class FamilyActivity extends Model {
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
        }
      },
      activityId: {
        type: DataTypes.UUID,
        references: {
          model: 'activities',
          key: 'id'
        }
      },
    }, {
      sequelize,
      modelName: 'family_activities'
    });
  }

  static associate(models) {
    this.belongsTo(models.Family, {
      foreignKey: 'familyId'
    });
    this.belongsTo(models.Activity, {
      foreignKey: 'activityId'
    });
  }
}

export default FamilyActivity;
