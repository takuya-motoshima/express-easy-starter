import express from 'express';
import UserSignin from '../../shared/UserSignin';

const router = express.Router();
router.post('/', async (req, res, next) => {
  const userSignin = new UserSignin();
  const isSuccess  = await userSignin.signin(req, res, next);
  res.json(isSuccess);
});
export default router;