import {Request, Response} from "express";
import productService from "../service/productService";
import categoryService from "../service/CategoryService";

class ProductController {
    private productService;
    private categoryService;

    constructor() {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    findAll = async (req: Request, res: Response) => {
            let listProduct = await this.productService.getAll();
            res.status(200).json(listProduct)
    }

    addProduct = async (req: Request, res: Response) => {
        if(!req.body.name){
            res.status(400).json({
                message: 'name missing'
            })
        }else{
            await this.productService.add(req.body);
            res.status(201).json({message:'OK'})
        }
    }

    deleteProductPost  = async (req: Request, res: Response) => {
        let id = req.body.idDelete
        await this.productService.deleteProduct(id);
        res.status(200).json({message: 'delete success'})
    }
    showFormUpdate = async (req: Request, res: Response) => {
        let id = req.params.id
        let product = await this.productService.findProductById(id);
        // console.log(product)
        res.status(200).json(product)
    }


    updateProduct = async (req: Request, res: Response) => {
        let id = req.params.id
        console.log(id)
        let updateProduct = req.body
        console.log(req.body)
        await this.productService.updateProductById(id, updateProduct)
        res.status(200).json({message: 'update success'})
    }

}

export default new ProductController();