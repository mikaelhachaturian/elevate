import { Model, Sequelize, DataTypes } from 'sequelize';

class User extends Model {
  declare id: number;
  declare name: string;
  declare given_name: string | null;
  declare email: string | null;
  declare picture: string | null;
}

export const initUsers = (sequelize: Sequelize) => {
  User.init(
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
      given_name: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      picture: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      tableName: 'users',
      sequelize, // passing the `sequelize` instance is required
    }
  );
};
