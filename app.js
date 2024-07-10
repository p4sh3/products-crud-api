import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"

import { productsRouter } from "./routes/products.js"
import { connectToDB } from "./utils/dbConections.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://snazzy-froyo-4151f4.netlify.app',
  optionsSuccessStatus: 200,
  methods: ["GET", "PUT", "POST", "DELETE"],
  preflightContinue: true,
}))



connectToDB();
app.use(json());
app.use("/api/product", productsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})