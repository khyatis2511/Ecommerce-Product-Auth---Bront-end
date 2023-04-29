import { Router } from 'express';
import userController from '../controllers/user.controller';

const applyUserRoutes = (app : Router) => {
  app.post('/register', userController.register);
  app.post('/login', userController.login);
  app.post('/logged-in-user-data', userController.loggedInUserData);
  return app;
};

export default applyUserRoutes;
