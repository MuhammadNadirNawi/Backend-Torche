const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const routes = require("./routers");
const cookieParser = require('cookie-parser')
const cors = require('cors')
const passport = require("passport");
passportStrategy = require('./app/controllers/passport')
const session = require('express-session')
const helmet = require("helmet")


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())  
app.use(
  session({
		secret: "secr3t",
    resave: false,
    saveUninitialized: true,
		cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
})
)
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(helmet())

connectDatabase();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Backend server is running at http://localhost:${process.env.PORT}`);
});