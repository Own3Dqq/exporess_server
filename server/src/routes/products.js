import { Router } from 'express';
import { productsDB } from './../database/index.js';
// import { v4 as uuidv4 } from 'uuid';

const router = Router();

router
    .get('/', (req, res) => {
        productsDB.read();
        let products = productsDB.data.products;

        res.status(200).json({
            stateText: 'success',
            data: products,
        });
    })
    .get('/:productId', (req, res) => {
        const { productID } = req.params;

        productsDB.read();

        let products = productsDB.data.products;

        let foundProduct = products.find((product) => product.productId === productID);

        if (foundProduct) {
            return res.status(200).json({
                statusText: 'success',
                data: foundProduct,
            });
        }
    });

export default router;
