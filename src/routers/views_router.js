import {Router} from 'express';
import passport from 'passport';
import { cartView, chatView, homeView, logOut, Login, loginView, productsView, realTimeView, registerPost, registerView } from '../controllers/views.controller.js';
import { auth, admin } from '../middleware/auth.js';

const router = Router();

router.get('/', homeView);
router.get('/realtimeproducts', [auth, admin], realTimeView);
/*router.post('/realtimeproducts', async (req,res)=>{
    const result = addProduct;
    res.json({result});
});*/
router.get('/chat', auth, chatView);
router.get('/products', auth, productsView);
router.get('/cart/:cid', auth, cartView);

router.get('/login', loginView);
router.get('/register', registerView);

router.post('/login', passport.authenticate('login', {failureRedirect:'/login'}), Login);
router.post('/register', passport.authenticate('register', {failureRedirect:'/register'}), registerPost);

router.get('/logout', logOut);

router.get('/github', passport.authenticate('github',{scope:['user: email']}), async(req, res) =>{ });
router.get('/login-github-callback', passport.authenticate('github', {failureRedirect:'/login'}, Login));

export default router;