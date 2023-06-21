const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const userRoutes = require("./Routes/Player");

// express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.SERVER_PORT || 8000;
// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use("/api/user", userRoutes);

mongoose
    .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to db!");
        app.listen(PORT, () => console.log("Server Up and running"));
    })
    .catch((err) => {
        console.error(err);
    });

