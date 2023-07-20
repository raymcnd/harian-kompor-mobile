import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import komporWhite from './assets/komporWhite.png'
import { ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigators/MainStack';

export default function App() {
  const {height, width} = useWindowDimensions();
    return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>  
  );
}


