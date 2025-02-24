import signale from 'signale';

import db from './models';

const syncModel = async () => {
  await db.User.sync({ force: true }).catch(signale.debug);
  await db.Image.sync({ force: true }).catch(signale.debug);
  await db.Account.sync({ force: true }).catch(signale.debug);
  await db.Agent.sync({ force: true }).catch(signale.debug);
  await db.Activity.sync({ force: true }).catch(signale.debug);
  await db.Category.sync({ force: true }).catch(signale.debug);
  await db.DiaryNote.sync({ force: true }).catch(signale.debug);
  await db.Family.sync({ force: true }).catch(signale.debug);
  await db.FamilyActivity.sync({ force: true }).catch(signale.debug);
  await db.Faq.sync({ force: true }).catch(signale.debug);
  await db.Post.sync({ force: true }).catch(signale.debug);
  await db.PostImage.sync({ force: true }).catch(signale.debug);
  await db.RoleType.sync({ force: true }).catch(signale.debug);
  await db.Relationship.sync({ force: true }).catch(signale.debug);
};

export default syncModel;
