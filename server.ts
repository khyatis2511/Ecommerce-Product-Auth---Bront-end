import express from 'express';
import dotenv from 'dotenv';
import applyUserRoutes from './routes/user.route';
import mongodbDatabase from './services/mongoService';

dotenv.config();
mongodbDatabase.connect();

const app = express();
const router = express.Router();

const port = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/ep/u1/', applyUserRoutes(router));

app.listen(port, () => {
  console.log('Server is running on port : ', port);
});
