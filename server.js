const express = require("express");
const cors = require('cors');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const dotenv = require('dotenv');
dotenv.config();


const app = express();

const dataRouter = require('./routes/data.route');

// for swagger
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Ludy API',
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

// pour cors
var corsOptions = {
    origin: "*", // this will change later. For example with  http://localhost:4200
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, PATCH, DELETE"
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(express.json());

app.use(express.urlencoded({extended:false}));


// all routes
app.use("/api/api-documentation",swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/api/data',dataRouter);

const port = process.env.PORT || 5000;

app.listen(port,async ()=>{
    console.log("Server is running on port ", port);
});

module.exports = app;