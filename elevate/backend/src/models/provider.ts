import { Model, Sequelize, DataTypes } from 'sequelize';

export class Provider extends Model {
  declare id: number;
  declare name: string;
  declare phone: string;
  declare description: string;
  declare work_times: string | null;
  declare cost: string | null;
}

export const initProviders = async (sequelize: Sequelize) => {
  Provider.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      phone: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      work_times: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      cost: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      description: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      tableName: 'providers',
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
