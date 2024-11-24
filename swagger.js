const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Pet Adoption API',
        description: 'Pets API'
    },
    host: 'cse-341-project2-29fu.onrender.com',  // change 'localhost:3000' or 'cse-341-project2-29fu.onrender.com'
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//this will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);