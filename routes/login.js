import express from 'express';

const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    res.render('login');
  } catch(e) {
    next(e);
  }
});
export default router;