import { NextFunction, Request, Response } from 'express';
import { IUser } from '../Interfaces/users/IUsers';
import JWT from '../utils/JWT';

const invalid = 'Token must be a valid token';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!email) { return res.status(400).json({ message: 'All fields must be filled' }); }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) { return res.status(401).json({ message: invalid }); }
    const validToken = JWT.verify(token);
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    try {
      const valid = JWT.verify(token) as IUser;
      res.status(200).json({ role: valid.role });
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  static async auth(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const validToken = JWT.verify(token);
    if (validToken === invalid) {
      return res.status(401).json({ message: validToken });
    }
    next();
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }
}

export default Validations;
