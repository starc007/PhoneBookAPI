const express = require("express");
const mongoose = require("mongoose");
const Contacts = require("./routes/Contact");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

mongoose.connect(
  process.env.DB_CONN,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("connected to DB!")
);
app.use(express.json());
app.use("/mojo", Contacts);

const PORT = process.env.PORT || 6969;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
