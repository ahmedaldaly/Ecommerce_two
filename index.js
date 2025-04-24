
const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./config/ConnectDB');
const cors = require('cors')
// google
const session = require("express-session");
const passport = require("passport");
const app = express();
dotenv.config();
ConnectDB();

app.use(cors());
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

app.get("/", (req, res) => res.send("Express on Vercel"));
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express with JavaScript!');
});

app.use('/api/vl/auth', require('./router/auth'));
app.use('/api/vl/user', require('./router/user'));
app.use('/api/vl/brand', require('./router/brand'));
app.use('/api/vl/product', require('./router/product'));
app.use('/api/vl/favorite', require('./router/favorite'));
app.use('/api/vl/comment', require('./router/comment'));
app.use('/api/vl/order', require('./router/order'));
app.use('/api/vl/category', require('./router/category'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
