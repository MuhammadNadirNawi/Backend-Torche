const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const routes = require("./routers");
const cookieParser = require('cookie-parser')
const cors = require('cors')



dotenv.config();
const app = express();

app.use(express.json());
app.use(routes);
app.use(cookieParser())
app.use(cors())  

connectDatabase();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend server is running at http://localhost:${process.env.PORT}`);
});