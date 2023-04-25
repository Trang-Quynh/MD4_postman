import {Router} from "express";
import productController from "../controller/productController";

const productRouter = Router();
productRouter.get('/', productController.findAll);
productRouter.post('/', productController.addProduct);
productRouter.delete('/', productController.deleteProductPost)

productRouter.get('/:id', productController.showFormUpdate)
productRouter.put('/:id', productController.updateProduct);
export default productRouter;