import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'  
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:80/graphql',
  }),
});
  
ReactDOM.render( 
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,  
  document.getElementById('root')
);
 
serviceWorker.unregister();