import winston from 'winston';
import App from './app';
import { config } from './config/config';

const app = new App();

async function start() {
  await app.init();
  // TODO: Get port from config
  const port = config.get('server.port');

  app.express.listen(port, err => {
    if (err) {
      return winston.error(err);
    }

    return winston.info(`Server is listening on port ${port}`);
  });
}

async function shutdown() {
  winston.info('Shutting down...');
  await app.exit();
  process.exit();
}

process.on('unhandledRejection', reason => {
  winston.error(reason.toString());
});

process.on('SIGINT', shutdown);
process.on('SIGQUIT', shutdown);
process.on('SIGTERM', shutdown);

start();
