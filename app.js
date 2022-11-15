const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const productsRoutes = require("./route/products");
const categoryRoutes = require("./route/categories");
const usersRoutes = require('./route/users');
const ordersRoutes = require('./route/orders');

//middleware
app.use(cors());
app.options("*", cors())
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);


const api = process.env.API_URL;
// Route Middleware
app.use(api + '/products', productsRoutes)
app.use(api + '/categories', categoryRoutes)
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));


//Database
mongoose
    .connect(process.env.CONNECTION_STRING,
        // {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // dbName: "eshop-database",
        // }
    )
    .then(() => {
        console.log("Database Connection is ready...");
    })
    .catch((err) => {
        console.log(err);
    });


//Server
app.listen(3000, () => {
    console.log("server is running http://localhost:3000");
});




// Extra
// API_URL=/api/v1
// secret=mysecretkey
// CONNECTION_STRING=mongodb://127.0.0.1:27017/ECOMMERCE-API