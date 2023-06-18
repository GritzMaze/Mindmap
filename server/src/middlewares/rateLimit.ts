import { Request, Response, NextFunction } from 'express';

const rateLimit = (requestsPerMinute: number) => {
  let requestCount = 0;
  let resetTime = 0;

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    if (now > resetTime) {
      requestCount = 0;
      resetTime = now + 60 * 1000; // reset in 1 minute
    }

    requestCount++;
    if (requestCount > requestsPerMinute) {
      const remainingTime = Math.ceil((resetTime - now) / 1000);
      return res.status(429).json({
        message: 'Too many requests, please try again later.',
        retryAfter: remainingTime,
      });
    }
    return next();
  };
};

export default rateLimit;