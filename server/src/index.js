import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use('/api/users', routes.users);
app.use('/api/products', routes.products);

app.listen(3000, () => {
    console.log('Start listening on 3000 port');
});
