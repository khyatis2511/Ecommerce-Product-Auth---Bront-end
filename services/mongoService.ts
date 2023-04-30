/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongodbDatabase = {
  connect: () => {
    mongoose.connect(process.env.MONGODB_LINK || '', connectOptions as ConnectOptions)
      .then(() => console.log('MongoDB connection established.'))
      .catch((error) => console.error('MongoDB connection failed:', error.message));
  },
};

export default mongodbDatabase;
