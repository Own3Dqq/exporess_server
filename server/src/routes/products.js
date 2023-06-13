import { Router } from 'express';
import db from './../database/index.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router
    .get('/', (req, res) => {
        db.read();
        const products = db.data.products;

        res.status(200).json({
            stateText: 'success',
            data: products,
        });
    })
    .get('/:id', function (req, res) {
        const { id } = req.params;

        db.read();
        let products = db.data.products;

        let foundProduct = products.find((product) => {
            return product.id === parseInt(id);
        });

        if (foundProduct) {
            return res.status(200).json({
                statusText: 'success',
                product: foundProduct,
            });
        }

        res.status(404).json({
            statusText: 'failed',
            message: `User with ${id} ID is not found`,
        });
    });

export default router;
