import express from 'express';

const router = express.Router();
router.get('/', async (req, res, next) => {
  res.render('profile');
});
export default router;