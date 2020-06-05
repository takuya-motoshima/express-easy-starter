import express from 'express';
import RekognitionClient from '../../shared/RekognitionClient';

const router = express.Router();
router.get('/', async (req, res, next) => {
  const client = new RekognitionClient();
  const collections = await client.getCollections();
  res.json(collections);
});
export default router;