require("dotenv").config();

const express = require("express");
const connectDB = require("./configs/database");

//const productController = require("./controllers/productController");
const productRoute = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express(); 

app.use(express.json());

//DB
connectDB();

//app.use("/api", productController);

app.use("/api", productRoute);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(process.env.PORT, () => {
  console.log('Server running on port $[process.env.PORT]');
});