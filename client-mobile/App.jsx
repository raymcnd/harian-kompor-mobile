import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import komporWhite from './assets/komporWhite.png'
import { ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigators/MainStack';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://808f-2001-448a-400d-1c1f-c1-e2ae-917a-97cb.ngrok-free.app",
  cache: new InMemoryCache
})

export default function App() {
  const {height, width} = useWindowDimensions();
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </ApolloProvider>
  );
}


