//This is a Node.js application using the Express framework to create a server.

// Importing Required Modules
const express = require("express"); 
const cors = require('cors'); // cela permet la connection du frontend au backend
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const dotenv = require('dotenv');
dotenv.config();

//Setting Up Express
const app = express(); // Initialization de l'application

//Routing
const dataRouter = require('./routes/data.route');

//Swagger Configuration
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'IDIAL-EMS-API',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:5000',
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http', 
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header'
          }
        }
      },
      security: {
        bearerAuth: []
      }
    },
    apis: [
      './routes/*.js',
    ],
    
};

const swaggerDocs = swaggerJSDoc(options);

//CORS Configuration
var corsOptions = {
    origin: "*", // this will change later. For example with  http://localhost:4200
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, PATCH, DELETE"
};

app.use(cors(corsOptions)); // ajout du cors a' l'application

//Middleware Setup:Configures middleware to parse incoming JSON and URL-encoded data
app.use(express.json()); // ajout d'express json
app.use(express.urlencoded({extended:false}));


//Routes Setup
app.use("/api/api-documentation/",swaggerUI.serve, swaggerUI.setup(swaggerDocs)); // ceci permet d'ouvrir l'application dans le swagger
app.use('/api/data', dataRouter); // permet d'appeler les routes

//Server Configuration
const port = process.env.PORT || 5000;
app.listen(port,async ()=>{
    console.log("Server is running on port ", port);
});

//Exporting the Express App to be used in other parts of the application
module.exports = app