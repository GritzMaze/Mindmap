export class DuplicatedUsernameError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicatedUsernameError';
  }
}