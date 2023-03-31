import  errorHandler from '../../../src/middlewares/errorHandler';

describe('Error Handler Middleware', () => {
  let req;
  let res;
  let err;
  let errorHandlingMiddleware;

  beforeEach(() => {
    req = {
      method: 'GET',
      path: '/test'
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    err = {
      status: 500,
      message: 'There have been an error'
    };
    errorHandlingMiddleware = errorHandler;
  });

  test('result with error', (done) => {
    errorHandlingMiddleware(err, req, res, null);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({
      method: req.method,
      path: req.path,
      status: err.status,
      message: err.message
    });
    done();
  });
});