import express from 'express';
import Database from '../shared/Database';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Hello , World');
});

router.get('/is-db-connect', async (req, res, next) => {
 const isConnect = await Database.isConnect();
 res.send(isConnect ? 'Can connect to DB.' : 'Cannot connect to DB.');
});

export default router;