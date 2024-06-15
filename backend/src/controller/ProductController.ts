import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entity/Product';

export class ProductController {
  async all(req: Request, res: Response) {
    const products = await getRepository(Product).find();
    res.json(products);
  }

  async create(req: Request, res: Response) {
    const { name, price, description } = req.body;
    const product = new Product();
    product.name = name;
    product.price = price;
    product.description = description;
    await getRepository(Product).save(product);
    res.json(product);
  }
}
