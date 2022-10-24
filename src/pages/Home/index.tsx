import './styles.css';
import { ContextProvider } from '../../context';
import {
  createHttpLink,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/react-hooks';
import { FilterSearch } from '../../components/organisms';

function Home() {
  const link = createHttpLink({
    uri: 'https://graphql-pokemon2.vercel.app',
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <FilterSearch />
      </ContextProvider>
    </ApolloProvider>
  );
}

export { Home };
