import express from 'express';
import UserModel from '~/models/UserModel';
import UserAuthentication from '~/authentication/UserAuthentication';

const router = express.Router();

router.put('/:id(\\d+)', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.body.changePassword) {
    const isPasswordCorrect = await UserModel.isPasswordCorrect(req.params.id, req.body.password);
    if (!isPasswordCorrect)
      return void res.json({ error: 'wrongPassword' });
  }
  const set: {name: string, password?: string} = {name: req.body.name as string};
  if (req.body.changePassword) set.password = req.body.newPassword as string;
  await UserModel.update(set, { where: { id: req.params.id } });
  res.json(true);
});

router.post('/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const isSuccess  = await UserAuthentication.signin(req, res, next);
  res.json(isSuccess);
});

router.get('/logout', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  UserAuthentication.signout(req, res, next);
  res.redirect('/');
});
export default router;