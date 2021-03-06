import express from 'express';
//import graphqlExpress from 'express-graphql';
import {
    graphqlExpress,
    graphiqlExpress
} from 'graphql-server-express';
import bodyParser from 'body-parser';

import schema from './schema';


const PORT = 3000;
const server = express();
const graphiql = true;

server.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
    schema,
    //context: context(request.headers, process.env),
})));

server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    query: `# Welcome to GraphiQL

query PostsForAuthor {
  author(id: 1) {
    firstName
    posts {
      title
      votes
    }
  }
}`
}));

server.listen(PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
    console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});
