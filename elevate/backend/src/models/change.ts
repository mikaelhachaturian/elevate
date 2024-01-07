import { Model, Sequelize, DataTypes } from 'sequelize';

interface DoorSpec {
  color: string;
  handle: string;
  light: string;
}

export class Change extends Model {
  declare id: number;
  declare email: string;
  declare type: string;
  declare description: DoorSpec;
  declare cost: string;
  declare approved: boolean;
}

export const initChanges = async (sequelize: Sequelize) => {
  Change.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      type: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      cost: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      description: {
        type: new DataTypes.JSON(),
        allowNull: true,
      },
      approved: {
        type: new DataTypes.BOOLEAN(),
      },
    },
    {
      tableName: 'changes',
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
