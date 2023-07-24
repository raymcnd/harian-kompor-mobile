import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import PostCard from "../components/PostCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import komporWhite from '../../assets/komporWhite.png'
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
    query Query {
        getUsers {
            _id
            username
            email
            role
            phoneNumber
            address
        }
    }
`

export default function HomeScreen() {
    const { loading, error, data } = useQuery(GET_POSTS)
    let posts = [0, 1, 2]

    console.log(data)

    if (loading) {
        return (
            <>
            <SafeAreaView style={{flex: 1, backgroundColor: "#930000"}}>
                {/* <StatusBar style="light"/> */}
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>
            </SafeAreaView>    
            </>
        )
    }

    if (error) {
        return (
            <>
            <SafeAreaView style={{flex: 1, backgroundColor: "#930000"}}>
            {/* <StatusBar style="light"/> */}
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text >{"Ooops! Something went wrong :("}</Text>
                </View>
            </SafeAreaView>
            </>
        )
    }

    return (
        <>
        <SafeAreaView style={{flex: 1, backgroundColor: "#930000"}}>
            {/* <StatusBar style="light"/> */}
            <View style={{height: "5%", alignItems: "center", justifyContent: "center", paddingBottom: 10}}> 
            <Image
                style={{width: "30%", resizeMode: "contain"}}
                source={komporWhite}
            />
            </View>

            <ScrollView style={{flex: 1, backgroundColor: "#F1F0EA"}} contentContainerStyle={{alignItems: "center"}}>

                {posts.map((e, i) => <PostCard key={i}/>)}

            </ScrollView>
        </SafeAreaView>
        </>
    )
}