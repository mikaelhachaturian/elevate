import { Model, Sequelize, DataTypes } from 'sequelize';

export class Notification extends Model {
  declare email: string;
  declare requestId: string;
  declare status: string;
}

export const initNotifications = (sequelize: Sequelize) => {
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      requestId: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      status: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: 'notifications',
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
