import { useNavigation } from "@react-navigation/core"
import moment from "moment"
import { Image, Pressable, Text, View } from "react-native"

export default function PostCardSmall({ post }) {
    const navigation = useNavigation()
    function formatDate(date) {
        // return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full',
        //   timeStyle: "medium"}).format(new Date(date))
        return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')
    }
   
    return (
    <Pressable style={{width: "100%", marginTop: 20, borderBottomWidth: 0.5, paddingBottom: 15}} onPress={() => {navigation.navigate('Detail', { id: post.id })}}>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
            <Text style={{fontSize: 20, fontWeight: "600", width: "60%"}}>{ post.title }</Text>
            <Image
                style={{width: "30%", aspectRatio: "1 / 1", resizeMode: "cover", borderRadius: 5}}
                source={{
                    uri: post.imgUrl
                }}
            />
        </View>        

        <Text style={{fontSize: 14, marginTop: 15, color: "#636362", textAlign: "right"}}>{ formatDate(post.createdAt) }</Text>
    </Pressable>
    )
}