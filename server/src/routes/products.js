import { Router } from 'express';
import db from './../database/index.js';
// import { v4 as uuidv4 } from 'uuid';

const router = Router();

router
    .get('/', (req, res) => {
        db.read();
        let products = db.data.products;

        res.status(200).json({
            stateText: 'success',
            data: products,
        });
    })
    .get('/:id', (req, res) => {
        console.log(req.params);
        const { productID } = req.params;

        db.read();

        let products = db.data.products;

        let foundProduct = products.find((product) => product.productId === productID);

        if (foundProduct) {
            return res.status(200).json({
                statusText: 'success',
                data: foundProduct,
            });
        }
    });
// .delete();

export default router;
