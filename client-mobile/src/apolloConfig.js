import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://808f-2001-448a-400d-1c1f-c1-e2ae-917a-97cb.ngrok-free.app",
  cache: new InMemoryCache
})


export default client