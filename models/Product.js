import mongoose from "mongoose"


export const productModel = mongoose.model("Product", new mongoose.Schema({
  name: {
    type: String,
    require: [true, "El nombre del producto es obligatorio"],
  },
  category: {
    type: String,
    required: [true, "La categoría del producto es obligatoria"],
    enum: ["electronicos", "hogar", "juguetes"],
  },
  stock: {
    type: Number,
    required: [true, "El stock del producto es obligatorio"],
  },
  price: {
    type: Number,
    required: [true, "El precio del producto es obligatorio"],
  },
  image: {
    type: String,
    required: [true, "La imagen del producto es obligatoria"],
  }
}))


