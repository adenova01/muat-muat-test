import type { Request, Response } from "express";
import client from "../databases";
import { Prisma } from "@prisma/client";


class productController {
  static async index(req: Request, res: Response) {
    try {
      const { keyword, sort } = req.query

      let sorting = {}
      if(sort){
        switch(sort){
          case "-stock":
            sorting = {
              stock: "desc"
            }
          break;

          case "stock":
            sorting = {
              stock: "asc"
            }
          break;

          case "-price":
            sorting = {
              price: "desc"
            }
          break;

          case "price":
            sorting = {
              price: "asc"
            }
          break;
        }
      }

      let filter = {}
      if(keyword){
        filter = {
          name: { contains: String(keyword), mode: "insensitive" }
        }
      }

      const product = await client.product.findMany({
        where: filter,
        orderBy: sorting
      });
      res.json(product);
    } catch (err: any) {
      res.status(500).json({ error: err, message: err.message });
    }
  }

  static async show(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const product = await client.product.findUnique({
        where: {
          id,
        },
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: { message: "product not found" } });
      }
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  static async create(req: Request, res: Response) {
    try {   
      const { name, price, stock } = req.body;
      const checkName = await client.product.findUnique({
        where: {
          name
        }
      })

      if (checkName) {
        res.status(201).json({ status: false, message: "name already exists" })
      } else {
        const createProduct = {
          name: name,
          price: parseInt(price),
          stock: parseInt(stock)
        }

        const product = await client.product.create({
          data: createProduct,
        });
        res.status(201).json(product);
      }
    } catch (err: any) {
      res.status(500).json({ error: err, message: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const checkProduct = await client.product.findFirst({
        where: {
          id: id
        }
      })

      if (!checkProduct) {
        res.status(404).json({ message: "product not found" });
      } else {
        const checkName = await client.product.findUnique({
          where: {
            name: req.body.name
          }
        })
        if (checkName) {
          res.status(400).json({ message: "name already used" })
        } else {
          const product = await client.product.update({
            where: {
              id,
            },
            data: {
              name: req.body.name,
              price: parseInt(req.body.price),
              stock: parseInt(req.body.stock)
            },
          });
          res.json(product);
        }
      }
    } catch (err: any) {
      if (err?.code === "P2025") {
        res.status(404).json({ error: { message: "product not found" } });
      } else {
        res.status(500).json({ error: err, message: err.message });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const product = await client.product.delete({
        where: {
          id,
        },
      });
      res.json({
        status: "success product deleted"
      });
    } catch (err: any) {
      if (err?.code === "P2025") {
        res.status(404).json({ error: { message: "product not found" } });
      } else {
        res.status(500).json({ error: err });
      }
    }
  }

  static async setFavorite(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const checkProduct = await client.product.findFirst({
        where: {
          id: id
        }
      })

      if (!checkProduct) {
        res.status(404).json({ message: "product not found" });
      } else {        
        const product = await client.product.update({
          where: {
            id,
          },
          data: {
            is_favorite: !checkProduct.is_favorite
          },
        });
        res.json(product);
      }
    } catch (err: any) {
      if (err?.code === "P2025") {
        res.status(404).json({ error: { message: "product not found" } });
      } else {
        res.status(500).json({ error: err, message: err.message });
      }
    }
  }
}

export default productController;
