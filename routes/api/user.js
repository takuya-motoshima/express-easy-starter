import express from 'express';
import UserModel from '../../models/UserModel';
import Authenticator from '../../shared/Authenticator';

const router = express.Router();
router.put('/:id(\\d+)', async (req, res, next) => {
  if (req.body.changePassword) {
    const isPasswordCorrect = await UserModel.isPasswordCorrect(req.params.id, req.body.password);
    if (!isPasswordCorrect) {
      return void res.json({ error: 'wrongPassword' });
    }
  }
  const set = { name: req.body.name };
  if (req.body.changePassword) {
    set.password = req.body.newPassword;
  }
  await UserModel.update(set, { where: { id: req.params.id } });
  res.json(true);
});
router.post('/login', async (req, res, next) => {
  const authenticator = new Authenticator();
  const isSuccess  = await authenticator.signin(req, res, next);
  res.json(isSuccess);
});
router.get('/logout', async (req, res, next) => {
  const authenticator = new Authenticator();
  authenticator.signout(req, res, next);
  res.redirect('/');
});
export default router;