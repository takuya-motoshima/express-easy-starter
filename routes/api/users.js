import express from 'express';
import UserModel from '../../models/UserModel';
import UserAuthentication from '../../authentication/UserAuthentication';

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
  const userAuthentication = new UserAuthentication();
  const isSuccess  = await userAuthentication.signin(req, res, next);
  res.json(isSuccess);
});

router.get('/logout', async (req, res, next) => {
  const userAuthentication = new UserAuthentication();
  userAuthentication.signout(req, res, next);
  res.redirect('/');
});
export default router;