import { Router } from 'express';
import userController from '../controllers/user.controller';

const applyUserRoutes = (app : Router) => {
  app.post('/register', userController.register);
  app.post('/login', userController.login);
  app.post('/user', userController.user);
  app.get('/category', userController.getCategory);
  app.post('/product', userController.saveProduct);
  return app;
};

export default applyUserRoutes;
