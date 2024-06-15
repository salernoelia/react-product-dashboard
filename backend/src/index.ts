import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { UserController } from "./controller/UserController";

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import cors from 'cors';  // Import cors
import { User } from './entity/User';
import { Product } from './entity/Product'; // Import the Product entity
import { ProductController } from './controller/ProductController'; // Import the Product controller

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());  // Use cors middleware
app.use(express.json());

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: true,
  entities: [User, Product],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    const userController = new UserController();
    const productController = new ProductController();

    app.get('/api/users', (req, res) => userController.all(req, res));
    app.post('/api/register', (req, res) => userController.register(req, res));
    app.post('/api/login', (req, res) => userController.login(req, res));

    app.get('/api/products', (req, res) => productController.all(req, res));
    app.post('/api/products', (req, res) => productController.create(req, res));

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });


createConnection()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server running on http://localhost:3001");
    });
  })
  .catch((error) => console.log(error));
