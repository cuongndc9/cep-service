import path from 'path';
import signale from 'signale';
import { migrateDB } from './components/utils';
import db from './models';
import app from './app';
// import syncModel from './syncModel';

const main = async () => {
  // await syncModel();
  const pathToMigration = path.join(__dirname, 'migrations');
  await migrateDB(db.sequelize, pathToMigration).catch(signale.watch);
  app();
};

main();
