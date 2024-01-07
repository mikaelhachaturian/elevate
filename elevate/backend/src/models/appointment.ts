import { Model, Sequelize, DataTypes } from 'sequelize';

export class Appointment extends Model {
  declare id: number;
  declare with: string;
  declare by: string;
  declare date: string;
  declare text: string | null;
}

export const initAppointments = (sequelize: Sequelize) => {
  Appointment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      with: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      by: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      text: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      date: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      tableName: 'appointments',
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
