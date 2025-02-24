import fs from 'fs';
import path from 'path';

const migration = {
  up: (queryInterface, Sequelize) => {
    const scriptPath = path.join(__dirname, './script.sql');
    const sql = fs.readFileSync(scriptPath, { encoding: 'utf8' });
    return queryInterface.sequelize.query(sql, {
      type: Sequelize.QueryTypes.RAW,
    });
  },
};

export default migration;
