
const { connectToMongoDB } = require("../src/db/connection");

const express = require("express");
const productRoutes = require("./routes/products.route");
const morgan = require("morgan");
require("dotenv").config({ path: "./.env" });

const app = express();

// for Cross-Origin Resource Sharing (CORS)
const cors = require("cors");
app.use(cors());
app.options("*", cors());

// for Parsing incoming JSON data
app.use(express.json());

// to Log HTTP requests in the console
app.use(morgan("dev"));

app.use("/v1", productRoutes);

// for Starting the server
app.listen(process.env.PORT, async () => {
  // Connect to MongoDB
  await connectToMongoDB();
  console.log(`Server is listening on port ${process.env.PORT}`);
});
