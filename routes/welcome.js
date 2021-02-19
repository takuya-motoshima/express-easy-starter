import express from 'express';

const router = express.Router();
router.get('/', async (req, res, next) => {
  res.render('welcome');
});
export default router;