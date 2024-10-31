const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: 'Company_bonus_API',
        description: 'Description'
    },
    host: 'http://localhost:3000/',
    schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = [
    './app.js'
];

swaggerAutogen(outputFile, routes, doc);
