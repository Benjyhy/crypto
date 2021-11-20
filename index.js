const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const articleRoutes = require("./routes/articleRoutes");

require("dotenv").config();

const dbURI = process.env.DB_CONN;

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("db connected");
        app.listen(process.env.PORT, () => {
            console.log("serv running");
        });
    })
    .catch((err) => console.log(err));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/cryptos", cryptoRoutes);
app.use("/articles", articleRoutes);
