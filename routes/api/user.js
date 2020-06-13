import express from 'express';
import UserModel from '../../models/UserModel';

const router = express.Router();
router.put('/:id', async (req, res, next) => {
  const userModel = new UserModel();
  if (req.body.changePassword) {
    const isPasswordCorrect = await userModel.isPasswordCorrect(req.params.id, req.body.password);
    if (!isPasswordCorrect) {
      return void res.json({ error: 'wrongPassword' });
    }
  }
  const set = { name: req.body.name };
  if (req.body.changePassword) {
    set.password = req.body.newPassword;
  }
  await userModel.update(set, { where: { id: req.params.id } });
  res.json(true);
});
export default router;