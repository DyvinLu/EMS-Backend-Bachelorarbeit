const express = require('express');
const cors = require('cors'); 
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const dotenv = require('dotenv');
dotenv.config();

const app = express(); 

const dataRouter = require('./routes/data.route');

//Swagger Configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IDIAL-EMS-API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
      },
    },
    security: {
      bearerAuth: [],
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(options);

//CORS Configuration
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: 'GET, POST, PUT, PATCH, DELETE',
};

app.use(cors(corsOptions));

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use(
  '/api/documentation/',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs)
); 
app.use('/api/data', dataRouter);

//Server Configuration
const port = parseInt(process.env.PORT) || 5000;
app.listen(port, async () => {
  console.log('Server is running on port ', port);
});

module.exports = app;
