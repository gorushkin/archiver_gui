export class ArchiverError extends Error {
  constructor(error, message) {
    super(error);
    this.message = message;
    this.isArchiverError = true;
  }
}
