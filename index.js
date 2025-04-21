
const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./config/ConnectDB');
// google
const session = require("express-session");
const passport = require("passport");
const app = express();
dotenv.config();
ConnectDB();


// google
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);


app.use(passport.initialize());
app.use(passport.session());


const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express with JavaScript!');
});

app.use('/api/vl/auth', require('./router/auth'));
app.use('/api/vl/user', require('./router/user'));
app.use('/api/vl/brand', require('./router/brand'));
app.use('/api/vl/product', require('./router/product'));
app.use('/api/vl/category', require('./router/category'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
