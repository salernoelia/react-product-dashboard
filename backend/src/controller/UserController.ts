import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export class UserController {
  async all(req: Request, res: Response) {
    const users = await getRepository(User).find();
    res.json(users);
  }

  async register(req: Request, res: Response) {
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = hashedPassword;
    await getRepository(User).save(user);
    res.json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await getRepository(User).findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  }
}
