// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyles from './components/GlobalStyles';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "apollo-link-context";

import Pages from './pages';

// Настраиваем API URI и кэш
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  }
})

// Настраиваем Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});

const data = {
  isLoggedIn: !!localStorage.getItem('token')
}

cache.writeData({ data })
client.onResetStore(() => cache.writeData({ data }))

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles/>
      <Pages/>
    </ApolloProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));