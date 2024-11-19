const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Pet Adoption API',
        description: 'Pets API'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);