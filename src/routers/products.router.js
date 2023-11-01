import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('products', { title: 'Products' });
});

export default router;