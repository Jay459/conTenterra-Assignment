const express = require('express');
const app = express();
const cookieparser = require('cookie-parser')
require('dotenv').config({path: __dirname + '/.env'})
const user_routes = require('./routes/userroute');
const db = require('./database/db')
const port = process.env.PORT 

app.use(express.json());
app.use(cookieparser());

app.use('/user',user_routes);

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});