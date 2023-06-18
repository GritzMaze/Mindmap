import cors from 'cors';
import { Router } from 'express';
import {
  LogLevel,
  logRequest,
  requestLogLevel
} from '../middlewares/requestLogging';
import notFound from './notFound';
import auth from '../middlewares/auth';
import login from './login';
import register from './register';
import mindmap from './mindmap';
import node from './node';
import connection from './connection';
import rateLimit from '../middlewares/rateLimit';

const router = Router();
const requestsPerMinute = 60;

router.use(cors());

router.use(requestLogLevel(LogLevel.info), logRequest);

router.use(rateLimit(requestsPerMinute));

router.use('/login', login);
router.use('/register', register);

router.use('/mindmap', mindmap);
router.use('/node', node);
router.use('/connection', connection);

router.use(notFound);
// router.use(auth);

// TODO: Add routes


export default router;
