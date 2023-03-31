export class ErrorFormattingService {
  public getErrorMessage(err: any) {
    if (err.message) {
      return err.message;
    }
    return null;
  }
}

export const errorFormattingService = new ErrorFormattingService();
