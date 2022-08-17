const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});

const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});
