import { errorFormattingService } from '../../../src/services/error-formatting.service';


describe('Error Formatting Service', () => {
  test('should return the error\'s message', (done) => {
    const message = 'There have been an error';
    const error = new Error(message);
    expect(errorFormattingService.getErrorMessage(error)).toBe(message);
    done();
  });

  test('Should fail', (done) => {
    const error = new Error;
    expect(errorFormattingService.getErrorMessage(error)).toBe(null);
    done();
  });
});