const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const mydb = require('./database/mydb');
const user_route = require('./routes/user');
const product_route = require('./routes/product');
const order_route = require('./routes/order')
const cart_route = require('./routes/cartRoute')
const morgan = require('morgan');

const PORT = 9000

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(morgan("dev"))
app.use(user_route);
app.use(product_route);
app.use(order_route)
app.use(cart_route)

app.listen(PORT, () =>
    console.log(`Server started at port num: ${PORT}`)
)