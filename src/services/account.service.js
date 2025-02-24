import { diana } from 'diana-js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../models';
import config from '../components/config';
import { ExistsError, AuthenticationError } from '../components/errors';

class AccountService {
  static async login(data) {
    const { phone, password } = data;
    const user = await db.User.findOne({ where: { phone } });
    if (!user) {
      throw new AuthenticationError('Tài khoản không tồn tại');
    }
    const account = await db.Account.findOne({ where: { userId: user.id } });
    const match = await bcrypt.compare(password, account.password);
    if (!match) {
      throw new AuthenticationError('Mật khẩu không chính xác');
    }
    const { id, role } = account;
    const { secretKey, algorithm } = config.jwt;
    const payload = {
      id,
      userId: user.id,
      role,
    };
    const token = jwt.sign(payload, secretKey, { algorithm });
    return {
      token,
      phone,
      ...user.toJSON(),
    };
  }

  static async register(data) {
    const { password, ...userData } = data;
    const existsUser = await db.User.findOne({ where: { phone: userData.phone } });
    if (existsUser) {
      throw new ExistsError('Số điện thoại đã được đăng ký');
    }
    const newUser = await db.User.create({ ...userData });
    const hashPassword = await bcrypt.hash(password, 10);
    const accountData = {
      username: diana(),
      password: hashPassword,
      userId: newUser.id,
    };
    const newAccount = await db.Account.create({ ...accountData });
    return {
      ...newUser.toJSON(),
      ...newAccount.toJSON(),
    };
  }
}

export default AccountService;
