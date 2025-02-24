import { Sequelize } from 'sequelize'
import signale from 'signale'

import Account from './account.model';
import Activity from './activity.model';
import Agent from './agent.model';
import Category from './category.model';
import DiaryNote from './diaryNote.model';
import Family from './family.model';
import FamilyActivity from './familyActivity.model';
import Faq from './faq.model';
import Image from './image.model';
import Post from './post.model';
import PostImage from './postImage.model';
import Relationship from './relationship.model';
import RoleType from './roleType.model';
import User from './user.model';

import config from '../components/config'

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: config.pgUser,
  password: config.pgPassword,
  database: config.pgDB,
  host: config.pgHost,
  port: config.pgPort,
  logging: config.nodeEnv === 'development' ? console.log : false,
  define: {
    underscored: true,
  },
})

sequelize
  .authenticate()
  .catch(e => {
    signale.watch(e)
    process.exit(1)
  })

const models = {
  Account,
  Activity,
  Agent,
  Category,
  DiaryNote,
  Family,
  FamilyActivity,
  Faq,
  Image,
  Post,
  PostImage,
  Relationship,
  RoleType,
  User,
};

Object.values(models)
  .forEach(model => model.init(sequelize));

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  sequelize,
  ...models,
};

export default db;
