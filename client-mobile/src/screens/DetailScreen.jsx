import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import TagLabel from "../components/TagLabel";
import moment from "moment/moment";
import { GET_POST } from "../queries/productQuery";

export default function DetailScreen({ route }) {
    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            getPostByIdId: route.params.id
        }
    })

    function formatDate(date) {
        // return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full',
        //   timeStyle: "medium"}).format(new Date(date))
        return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')
    }

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

    const { getPostById: post } = data
    console.log(post.createdAt)
    console.log(formatDate(new Date(post.createdAt)))
    return (
        <ScrollView>
                <Text style={{fontSize: 28, fontWeight: "600", marginTop: 15, paddingHorizontal: "5%"}}>{ post.title }</Text>
                <Text style={{fontSize: 16, marginTop: 5, paddingHorizontal: "5%"}}>Oleh {post.authorMongo.username} · {String(formatDate(post.createdAt))}</Text>

                <Image
                    style={{width: "100%", height: 300, resizeMode: "cover", marginTop: 20}}
                    source={{
                        uri: post.imgUrl
                    }}
                />

                <Text style={{fontSize: 18, paddingTop: 15, paddingHorizontal: "5%", paddingBottom: "15%"}}>{post.content}</Text>

                <Text style={{fontSize: 16, paddingTop: 5, paddingHorizontal: "5%", marginTop: 15, fontWeight: "bold" }}>TAGS</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: "5%", paddingBottom: "15%", marginTop: 15}} >
                {
                    post.Tags.length === 0 ?
                    <Text>-</Text> :
                    post.Tags.map((e, i) => <TagLabel key={i} tag={e} />)
                }
                </View>
                
        </ScrollView>
    )
}