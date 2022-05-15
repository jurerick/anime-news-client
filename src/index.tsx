import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { App } from './App';

const restLink = new RestLink({ uri: `${process.env.REACT_APP_SERVER_API_URL}` });
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);


