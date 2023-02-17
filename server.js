//Swagger UI
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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
// Swagger options
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'A sample API'
      },
        schemes: [
          'http',
          'https'
        ] ,
      servers: [
        {
          url: 'https://e-commerceapp-31s4.onrender.com'
        }
      ],securityDefinitions:{
      Bearer:{
        type: 'apiKey',
        name: 'Authorization',
        in:'headers',
        BearerFormart:'JWT'}}
      },
     
    apis: ['./Auth/yaml.js','./User/yaml.js','./Product/yaml.js']
  };
  const specs = swaggerJsdoc(options);
// Add Swagger UI  Path
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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