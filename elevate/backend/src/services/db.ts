import { Sequelize } from 'sequelize';
import { initProviders } from '../models/provider';
import { initUsers } from '../models/user';
import { populateProviders } from './providers';
import { initAppointments } from '../models/appointment';
import { initOffers } from '../models/offer';

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
  initProviders(sequelize);
  initAppointments(sequelize);
  initOffers(sequelize);
  await sequelize.sync({ force: true });
  await populateProviders();
  // sequelize.close();
  console.log('All models were synchronized successfully.');
};
