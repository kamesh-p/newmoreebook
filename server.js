let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");

const bookRoute = require("../backend/Routes/book_route");
const userRoute = require("../backend/Routes/user_route");
const sellRoute = require("../backend/Routes/sell_route");
const orderRoute = require("../backend/Routes/order_route");
const genreRoute = require("../backend/Routes/genre_route");
const libRoute = require("../backend/Routes/library_route");

mongoose
  .connect("mongodb://127.0.0.1:27017/Moore")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/selling", sellRoute);
app.use("/details", orderRoute);
app.use("/genre", genreRoute);
app.use("/library", libRoute);
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
