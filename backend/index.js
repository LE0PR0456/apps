import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
    {origin: '*http://localhost:3000'}
));
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});