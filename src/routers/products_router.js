import {Router} from 'express';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { auth, admin } from '../middleware/auth.js';
import { productMock } from '../Mocks/productMock.js';

const router = Router();

//Mocking
router.get('/mockingproducts', productMock);

//Porducts routes
router.get('/',[auth, admin], getProducts);
router.get('/:pid',[auth, admin], getProductById);
router.post('/', auth, addProduct);
router.put('/:pid', admin, updateProduct);
router.delete('/:pid', admin, deleteProduct);

export default router;