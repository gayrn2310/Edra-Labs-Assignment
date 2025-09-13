import express from 'express';
import { getAlias } from '../controllers/getAlias.js';
import { shortenURL } from '../controllers/shortenURL.js';
import { getAnalytics } from '../controllers/getAnalytics.js';
import { updateURL } from '../controllers/updateURL.js';
import { deleteURL } from '../controllers/deleteURL.js';

const router = express.Router();

router.get('/:alias', getAlias);
router.post('/shorten', shortenURL);
router.get('/analytics/:alias', getAnalytics);
router.put('/update/:alias', updateURL);
router.delete('/delete/:alias', deleteURL);

export default router;