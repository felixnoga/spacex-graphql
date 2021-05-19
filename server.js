require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Running server on port: ${process.env.EXPRESS_PORT}`);
});
