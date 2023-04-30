export class UserNotExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotExistError';
  }
}