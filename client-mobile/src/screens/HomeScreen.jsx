import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import PostCard from "../components/PostCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import komporWhite from '../../assets/komporWhite.png'
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/productQuery";
import PostCardSmall from "../components/PostCardSmall";

export default function HomeScreen() {
    const { loading, error, data } = useQuery(GET_POSTS)

    function getHotPosts() {
        let hotPosts = []

        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * data.getPosts.length)
            hotPosts.push(data.getPosts[randomIndex])
        }

        return hotPosts
    }

    function hotPosts() {
        return (
            <>  
                <Text style={{fontSize: 24, fontWeight: "bold", marginTop: 15}}>Topik Panas 🔥</Text>
                {getHotPosts().map((e, i) => <PostCardSmall key={i} post={e}/>)}
            </>
        )
    }

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
            {/* <ScrollView style={{ paddingHorizontal: "7.5%"}} scrollEnabled> */}
                {/* Posts Trending */}
                {/* {getHotPosts().map((e, i) => <PostCardSmall key={i} post={e}/>)} */}

                {/* Posts Terkini */}
                <FlatList
                    data={data.getPosts}
                    renderItem={({ item }) => {
                        return (
                        <>
                            <PostCard post={item}/>
                        </>
                    )}}
                    extraData={data.getPosts}
                    style={{ paddingHorizontal: "7.5%"}}
                    ListHeaderComponent={(
                        <>
                        {hotPosts()}
                        <Text style={{fontSize: 24, fontWeight: "bold", marginTop: 35}}>Terkini</Text>
                        </>
                        )}
                    
                    />
            {/* </ScrollView> */}
        </>
    )
}