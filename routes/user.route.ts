import { Router } from 'express';
import userController from '../controllers/user.controller';

const applyUserRoutes = (app : Router) => {
  app.post('/register', userController.register);
  app.post('/login', userController.login);
  app.post('/logged-in-user-data', userController.loggedInUserData);
  app.get('/get-category', userController.getCategory);
  app.post('/save-product', userController.saveProduct);
  return app;
};

export default applyUserRoutes;
