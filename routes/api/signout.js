import express from 'express';
import UserSignin from '../../shared/UserSignin';

const router = express.Router();
router.get('/', async (req, res, next) => {
  const userSignin = new UserSignin();
  userSignin.signout(req, res, next);
  res.redirect('/');
});
export default router;