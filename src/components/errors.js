import { ApolloError } from 'apollo-server-errors';
import { snakeCase } from 'lodash';

export class AppError extends ApolloError {
  constructor(message = 'Lỗi hệ thống') {
    super(message);
    this.extensions.code = snakeCase(this.constructor.name).toUpperCase();
  }
}

export class BusinessError extends ApolloError {
  constructor(message = 'There is business error happened') {
    super(message);
    this.extensions.code = snakeCase(this.constructor.name).toUpperCase();
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'There is database error happened') {
    super(message);
  }
}

export class DatabaseValidationError extends AppError {
  constructor(message = 'There is database validation error happened') {
    super(message);
  }
}

export class SchemaValidationError extends BusinessError {
  constructor(error) {
    super(error.message);
    let payload = {};
    error.details.forEach((item) => {
      const {
        path, type, message, context,
      } = item;
      payload = {
        ...payload,
        [path.toString()]: {
          message,
          type,
          context,
        },
      };
    });
    this.extensions.payload = payload;
  }
}

export class AuthenticationError extends BusinessError {
  constructor(message = 'There is authentication error happened') {
    super(message);
  }
}

export class AuthorizationError extends BusinessError {
  constructor(message = 'There is authorization error happened') {
    super(message);
  }
}

export class NotFoundError extends BusinessError {
  constructor(message = 'There is not found error happened') {
    super(message);
  }
}

export class ExistsError extends BusinessError {
  constructor(message = 'There is exists error happened') {
    super(message);
  }
}
