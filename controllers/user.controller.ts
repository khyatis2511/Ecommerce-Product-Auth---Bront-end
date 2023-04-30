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
  loggedInUserData: (req: Request, res: Response) => {
    user.loggedInUserData(req).then((result) => {
      res.status(200).send(result).end();
    });
  },
};

export default userController;
