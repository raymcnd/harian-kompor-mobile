import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import PostCard from "../components/PostCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import komporWhite from '../../assets/komporWhite.png'
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/productQuery";

export default function HomeScreen() {
    const { loading, error, data } = useQuery(GET_POSTS)

    if (loading) {
        return (
            <>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                </View>  
            </>
        )
    }

    if (error) {
        return (
            <>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text >{"Ooops! Something went wrong :("}</Text>
                </View>
            </> 
        )
    }

    return (
        <>
            <FlatList
                data={data.getPosts}
                renderItem={({ item }) => <PostCard post={item}/>}
                extraData={data.getPosts}
                style={{ paddingHorizontal: "7.5%"}}
                />
        </>
    )
}