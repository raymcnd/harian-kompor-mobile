import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import PostCard from "../components/PostCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import komporWhite from '../../assets/komporWhite.png'
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
    query Query {
        getPosts {
            id
            title
            content
            imgUrl
            categoryId
            authorMongoId
            createdAt
            Category {
                name
            }
            Tags {
                name
            }
        }
    }
`

export default function HomeScreen() {
    const { loading, error, data } = useQuery(GET_POSTS)

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
        {/* <SafeAreaView style={{flex: 1, backgroundColor: "#930000"}}> */}
            {/* <StatusBar style="light"/> */}
            {/* <View style={{height: "5%", alignItems: "center", justifyContent: "center", paddingBottom: 10}}> 
            <Image
                style={{width: "30%", resizeMode: "contain"}}
                source={komporWhite}
            />
            </View> */}
            {/* <View style={{ marginHorizontal: "7.5%"}}> */}
                <FlatList
                    data={data.getPosts}
                    renderItem={({ item }) => <PostCard post={item}/>}
                    extraData={data.getPosts}
                    style={{ paddingHorizontal: "7.5%"}}
                    />
            {/* </View> */}


            {/* <ScrollView style={{flex: 1, backgroundColor: "#F1F0EA"}} contentContainerStyle={{alignItems: "center"}}>

                {data.getPosts.map((e, i) => <PostCard key={i} post={e}/>)}

            </ScrollView> */}
        {/* </SafeAreaView> */}
        </>
    )
}