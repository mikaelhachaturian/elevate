import { Model, Sequelize, DataTypes } from 'sequelize';

export class Offer extends Model {
  declare email: string;
  declare bank_name: string;
  declare total_years: number;
  declare monthly_payment: number;
  declare fixed: string;
  declare changes_every_5_years_offer: string;
  declare prime: string;
}

export const initOffers = (sequelize: Sequelize) => {
  Offer.init(
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
      bank_name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      total_years: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      monthly_payment: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      fixed: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      changes_every_5_years_offer: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      prime: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      tableName: 'offers',
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
