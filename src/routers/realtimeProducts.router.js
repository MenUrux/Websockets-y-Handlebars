import { Router } from 'express';

const router = Router();

router.get('/realtimeproducts', (req, res) => {
  res.render('realtimeProducts', { title: 'Realtime Products' });
});

export default router;