import express from 'express';
import RekognitionClient from '../../shared/RekognitionClient';

const router = express.Router();
const client = new RekognitionClient();

router.get('/', async (req, res, next) => {
  const collections = await client.getCollections();
  res.json(collections);
});

router.delete('/:id', async (req, res, next) => {
  await client.deleteCollection(req.params.id);
  res.json(true);
});

export default router;