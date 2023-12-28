import { Sequelize } from 'sequelize';
import { User, initUsers } from '../models/user';

const getDBInstance = (): Sequelize => {
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const db = process.env.MYSQL_DATABASE;

  const sequelize = new Sequelize(db, user, password, {
    host: host,
    dialect: 'mysql',
  });
  return sequelize;
};

export const initDB = async () => {
  const sequelize = getDBInstance();
  initUsers(sequelize);
  await sequelize.sync({ force: true });
  // sequelize.close();
  console.log('All models were synchronized successfully.');
};
