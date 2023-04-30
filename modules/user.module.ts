/* eslint-disable no-underscore-dangle */
import { Request } from 'express';
import User from '../models/user.model';
import { returnRes, msgs } from '../services/messages';
import Category from '../models/category.model';
import Product from '../models/product.model';
import ProductPrice from '../models/productPrice.model';

const user = {
  register: async (req : Request) => {
    try {
      const userData = new User(req.body);
      const userDetails = await userData.save();
      if (userDetails) {
        const { _id, name, email } = userDetails;
        return returnRes(200, msgs.registered, { id: _id, name, email });
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      // console.log('register API : ', error);
      if (error.message !== undefined) {
        if (error.name === 'MongoServerError' && error.message.includes('duplicate')) {
          return returnRes(409, msgs.emailExist);
        } if (error.name === 'PasswordError') {
          return returnRes(400, error.message);
        }
        return returnRes(400, msgs.somethingWrong);
      }
      return returnRes(400, msgs.somethingWrong);
    }
  },
  login: async (req : Request) => {
    try {
      const userData = await User.findOne({ email: req.body.email });
      if (userData !== null) {
        const isMatched = userData.validatePassword(req.body.password);
        if (isMatched) {
          const { _id, name, email } = userData;
          return returnRes(200, msgs.loggedIn, { id: _id, name, email });
        }
        return returnRes(401, msgs.invalidPassword);
      }
      return returnRes(401, msgs.unauthorized);
    } catch (error: any) {
      // console.log('login API:  ',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  user: async (req: Request) => {
    try {
      const userData = await User.findById(req.body.id);
      if (userData) {
        const { _id, name, email } = userData;
        return returnRes(200, msgs.dataSent, { id: _id, name, email });
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      // console.log('loggedInUserData API:  ',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  getCategory: async () => {
    try {
      const categoryData = await Category.find({});
      if (categoryData) {
        const data = categoryData.map((category) => ({
          value: category._id,
          text: category.name,
        }));
        return returnRes(200, msgs.dataSent, data);
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      // console.log('getCategory API:  ',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
  saveProduct: async (req: Request) => {
    try {
      const productData = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: null,
      };
      const product = new Product(productData);
      const productDetails = await product.save();
      if (productDetails) {
        const { _id } = productDetails;
        const data = {
          productId: _id,
          createdAt: new Date(),
          updatedAt: null,
        };
        const productPriceData = new ProductPrice(data);
        const productPriceDetails = await productPriceData.save();
        const updateCategory = await Category.updateOne(
          { _id: req.body.category },
          { $push: { products: _id } },
        );
        if (productPriceDetails && updateCategory) {
          return returnRes(200, msgs.dataSaved);
        }
        return returnRes(400, msgs.somethingWrong);
      }
      return returnRes(400, msgs.somethingWrong);
    } catch (error: any) {
      // console.log('saveProduct API:  ',error);
      return returnRes(400, msgs.somethingWrong);
    }
  },
};

export default user;
