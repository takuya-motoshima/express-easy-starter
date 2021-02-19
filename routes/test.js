import express from 'express';
import Database from '../shared/Database';
import UserModel from '../models/UserModel';

const router = express.Router();
router.get('/', async (req, res, next) => {
  // Check the return value when there is no corresponding data in findAll
  let users = await UserModel.findAll({ where: { name: 'Not in' } });
  console.log('users=', users);// []
  // Check the return value when there is no corresponding data in findOne
  let user = await UserModel.findOne({ where: { name: 'Not in' } });
  console.log('user=', user);// null
  // Count test
  let count = await UserModel.count({ where: { id: [1,2,3] } });
  console.log('count=', count);
  res.send('Hello , World');
});

router.get('/is-db-connect', async (req, res) => {
 const isConnect = await Database.isConnect();
 res.send(isConnect ? 'Can connect to DB.' : 'Cannot connect to DB.');
});

router.get('/:state(foo|bar)', async (req, res) => {
  console.log('req.params.state=', req.params.state);
  res.send(`State is ${req.params.state}`);
});

router.get('/error', async (req, res, next) => {
  try {
    console.log('Error action called');
    new Error('Intentionally error');
  } catch(err) {
    console.log('Call next function');
    next(err);
  }
});
export default router;