import { Image, ScrollView, Text, View } from "react-native";
import PostCard from "../components/PostCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import komporWhite from '../../assets/komporWhite.png'


export default function HomeScreen() {
    let posts = [0, 1, 2]

    return (
        <>
        {/* <SafeAreaView style={{flex: 1, backgroundColor: "#930000"}}> */}
            <StatusBar style="light"/>
            <View style={{height: "5%", alignItems: "center", justifyContent: "center", paddingBottom: 10}}> 
            <Image
                style={{width: "30%", resizeMode: "contain"}}
                source={komporWhite}
            />
            </View>

            <ScrollView style={{flex: 1, backgroundColor: "#F1F0EA"}} contentContainerStyle={{alignItems: "center"}}>

                {posts.map((e, i) => <PostCard key={i}/>)}

            </ScrollView>
        {/* </SafeAreaView> */}
        </>
    )
}