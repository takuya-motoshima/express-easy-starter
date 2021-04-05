import express from 'express';

const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    res.render('dashboard');
  } catch(e) {
    next(e);
  }
});
export default router;