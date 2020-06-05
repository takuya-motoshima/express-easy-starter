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

router.post('/', async (req, res, next) => {
  const result = await client.addCollection(req.body.id);
  res.json(result);
});

export default router;