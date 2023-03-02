const express = require("express");
const dotenv = require("dotenv");
const connection = require("./config/database");


dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend server is running at http://localhost:${process.env.PORT}`);
});