const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes");

const dbURI = "";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));

app.use(express.json());

app.listen(8080, () => {
    console.log("serv running");
});

app.get("/", (req, res) => {
    res.redirect("/blog");
});

app.use("/users", userRoutes);
