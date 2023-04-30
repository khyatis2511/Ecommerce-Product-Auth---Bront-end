import { Request, Response } from 'express';
import user from '../modules/user.module';

const userController = {
  register: (req: Request, res: Response) => {
    user.register(req).then((result) => {
      res.status(200).send(result).end();
    });
  },
  login: (req: Request, res: Response) => {
    user.login(req).then((result) => {
      res.status(200).send(result).end();
    });
  },
  user: (req: Request, res: Response) => {
    user.user(req).then((result) => {
      res.status(200).send(result).end();
    });
  },
  getCategory: (req: Request, res: Response) => {
    user.getCategory().then((result) => {
      res.status(200).send(result).end();
    });
  },
  saveProduct: (req: Request, res: Response) => {
    user.saveProduct(req).then((result) => {
      res.status(200).send(result).end();
    });
  },
};

export default userController;
