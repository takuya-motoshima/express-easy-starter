import express from 'express';
import UserModel from '../models/UserModel';

const router = express.Router();
router.get('/', async (req, res, next) => {
  const userModel = new UserModel();
  const users = await userModel.findAll({ raw: true });
  console.log('users=', users);
  res.render('index', { title: 'Node.js - Express Framework Easy Starter' });
});
export default router;