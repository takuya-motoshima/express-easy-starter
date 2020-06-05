import express from 'express';

const router = express.Router();
router.get('/', async (req, res, next) => {
  res.render('faceRecognition', { title: 'Face Recognition' });
});
export default router;