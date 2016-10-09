import express from 'express';

import analysisHandlers from './analysis';

const router = new express.Router();

router.use('/analysis', analysisHandlers);

export default router;