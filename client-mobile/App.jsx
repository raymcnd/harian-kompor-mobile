import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import komporWhite from './assets/komporWhite.png'
import { ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const {height, width} = useWindowDimensions();

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, backgroundColor: "#930000"}}>
      {/* <View style={{flex: 1, backgroundColor: "#930000", paddingTop: 0.07*height}}> */}
        <StatusBar style="light"/>
        <View style={{height: "5%", alignItems: "center", justifyContent: "center", paddingBottom: 10}}> 
          <Image
            style={{width: "30%", resizeMode: "contain"}}
            source={komporWhite}
          />
        </View>

        <ScrollView style={{flex: 1, backgroundColor: "#E0DDCF"}} contentContainerStyle={{alignItems: "center"}}>
          <View style={{height: 300, width: "90%", backgroundColor: "#F1F0EA", marginTop: 10}}>
              <Text>Tesss</Text>
          </View>

          <View style={{height: 300, width: "90%", backgroundColor: "#F1F0EA", marginTop: 10}}>
              <Text>Tes</Text>
          </View>

          <View style={{height: 300, width: "90%", backgroundColor: "#F1F0EA", marginTop: 10}}>
              <Text>Tes</Text>
          </View>

          <View style={{height: 300, width: "90%", backgroundColor: "#F1F0EA", marginTop: 10}}>
              <Text>Tes</Text>
          </View>

          <View style={{height: 300, width: "90%", backgroundColor: "#F1F0EA", marginTop: 10}}>
              <Text>Tes</Text>
          </View>

          <View style={{height: 300, width: "90%", backgroundColor: "#F1F0EA", marginTop: 10}}>
              <Text>Tes</Text>
          </View>
        </ScrollView>

      {/* </View>  */}
      </SafeAreaView>
    </NavigationContainer>
  );
}


