import { isValidObjectId } from "mongoose";

import path from "node:path"
import fs from "node:fs/promises"

import { productModel } from "../models/Product.js"

export class ProductController {
  static async getAll(_, res) {
    try {
      const products = await productModel.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).send({ message: "ID invalido" });

    try {
      const product = await productModel.findById(id).lean();

      if (!product) return res.status(404).json({ error: "Producto no encontrado" });

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    const { name, category, stock, price, image } = req.body
    try {
      const newProduct = productModel({ name, category, stock, price, image });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {

    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).send({ message: "ID invalido" });

    try {
      const product = await productModel.findByIdAndDelete(id);

      if (!product) return res.status(404).json({ error: "Producto no encontrado" })
      res.status(200).json({ message: "Producto Eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).send({ message: "ID invalido" });

    const { name, category, stock, price, image } = req.body;
    try {
      let producToUpdate = await productModel.findById(id);

      if (!producToUpdate) return res.status(404).json({ error: "Producto no encontrado" })

      producToUpdate.name = name || producToUpdate.name
      producToUpdate.category = category || producToUpdate.category
      producToUpdate.stock = stock || producToUpdate.stock
      producToUpdate.price = price || producToUpdate.price
      producToUpdate.image = image || producToUpdate.image

      await producToUpdate.save();
      res.status(200).json(producToUpdate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}