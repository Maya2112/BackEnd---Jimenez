import {Router} from 'express';
import { addProduct } from '../controllers/product.controller.js';
import { cartView, chatView, homeView, logOut, loginPost, loginView, productsView, realTimeView, registerPost, registerView } from '../controllers/views.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.get('/', homeView);
router.get('/realtimeproducts', auth, realTimeView);
/*router.post('/realtimeproducts', async (req,res)=>{
    const result = addProduct;
    res.json({result});
});*/
router.get('/chat', auth, chatView);
router.get('/products', auth, productsView);
router.get('/cart/:cid', auth, cartView);

router.get('/login', loginView);
router.post('/login', loginPost);

router.get('/register', registerView);
router.post('/register', registerPost);

router.get('/logout', logOut);

export default router;