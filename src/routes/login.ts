import express from 'express';

const router = express.Router();
router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('login');
});
export default router;