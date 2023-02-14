//DotEnv
require('dotenv').config();
//Express
const express = require('express');
const app = express();
//Db
const db = require('./Config/DB');
db();
//Cors
const cors = require('cors');
app.use(cors());
// Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Auth
const auth = require('./Auth/Controller');
app.use('/auth',auth);
//Product
const product = require('./Product/Controller');
app.use('/product',product);
//User
const user = require('./User/Controller');
app.use('/user',user);
 
//PORT
const PORT = process.env.PORT || 5000;
//SERVER
app.listen(PORT,()=>{
    console.log(`Serving At : http://localhost:${PORT}`);
});