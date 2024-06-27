//importing express, apollo/server packages, express middleware all to be used in an apollo application
import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import typeDefs from './schemas/typeDefs.js'
import  resolvers  from './schemas/resolvers.js';
import db from './config/connection.js'

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

import { authMiddleware } from './utils/auth.js';

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
    await server.start();
    
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        //context is being assigned whatever authMiddleware returns, b/c authMiddleware is a fxn
        // in this case, authMiddleware returns 'req' which has the user property on it (since we set req.user = data -- data is payload which is stated in signToken)
        context: authMiddleware
      }));
    
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();