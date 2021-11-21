
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';

import userRoutes from "./routes/userRoutes.js"
import cryptoRoutes from "./routes/cryptoRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";

const __dirname = path.resolve();

const app = express();
dotenv.config();

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
app.use(express.static(__dirname + "/public"));

app.use("/users", userRoutes);
app.use("/cryptos", cryptoRoutes);
app.use("/articles", articleRoutes);
