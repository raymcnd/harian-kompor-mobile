import { useNavigation } from '@react-navigation/native';
import { Button, Image, Pressable, Text, View } from "react-native";

export default function PostCard() {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula vestibulum dui. Aliquam eleifend varius dolor, vel varius purus commodo at. Aenean ligula lorem, semper et risus vitae, commodo maximus lectus. Aliquam nec tempus nisl. Etiam pharetra hendrerit ante, a consequat eros commodo id. Fusce vitae risus dapibus, sagittis diam nec, porttitor nisi. Phasellus malesuada dolor in nisl dictum, ac blandit mauris dapibus. Sed luctus nibh mauris, in tempor velit interdum quis. Donec pulvinar tristique nisl quis consequat. Nunc auctor mauris lectus, non commodo erat venenatis auctor. In sollicitudin erat et sollicitudin malesuada. Ut ultrices lacus et orci dapibus faucibus. Etiam tristique nibh nec odio tincidunt facilisis. Ut aliquet diam at erat fermentum pulvinar. Pellentesque auctor porttitor orci, sit amet feugiat tellus iaculis a.\n\n            Sed tellus sem, scelerisque at nisi a, tincidunt aliquam justo. Sed faucibus est eget dui pharetra ornare. Sed lobortis sapien odio, eget congue dui mollis sit amet. Morbi tincidunt risus orci, eleifend feugiat augue pharetra id. Proin ut purus vestibulum, dictum nulla ut, egestas erat. Quisque tincidunt pharetra lacus facilisis mollis. Nullam tristique leo metus, id facilisis diam convallis semper. Etiam commodo dictum lacinia. Vestibulum faucibus urna nec aliquam molestie. Fusce id erat volutpat, pharetra est ultrices, dignissim ligula. In placerat ac nisi a accumsan. In lobortis libero at hendrerit luctus. Fusce congue luctus ligula, sed tincidunt neque vehicula ut. Aliquam sem urna, imperdiet at rhoncus a, interdum eu nulla. Aenean justo justo, sodales eu ex in, vestibulum ultricies dolor.\n            \n            Mauris lectus justo, vestibulum sed volutpat vel, molestie id lorem. Aenean feugiat egestas nulla non egestas. Nullam elementum tellus magna. Nulla eu ultrices sapien. Aliquam tincidunt molestie ornare. Donec imperdiet tortor massa, nec rhoncus sem porta et. Pellentesque at volutpat purus. Aliquam quis maximus diam. Aenean finibus mi sed consectetur aliquam. Morbi leo nisi, feugiat iaculis dui sit amet, ultricies elementum metus."
    const navigation = useNavigation()
    return (
        // <Pressable >
            <Pressable style={{width: "85%", marginTop: 20, borderBottomWidth: 0.5, paddingBottom: 15}} onPress={() => {navigation.navigate('Detail')}}>
                <Image
                style={{width: "100%", height: 200, resizeMode: "cover", borderRadius: 5}}
                source={{
                    uri: "https://akcdn.detik.net.id/community/media/visual/2023/07/09/muhmin-70-pedagang-di-blok-g-pasar-tanah-abang-jakarta-pusat-wildan-detikcom-1_169.jpeg?w=700&q=90"
                }}
                />
                <Text style={{fontSize: 24, fontWeight: "600", marginTop: 10}}>Pedagang Ngeluh Skybridge Tanah Abang Berdampak Sepinya Blok G</Text>
                <Text style={{fontSize: 16, marginTop: 5}}>{loremIpsum.substring(0, 200)} ...Selengkapnya</Text>
                {/* <Button title="Detail" onPress={() => {navigation.navigate('Detail')}}/> */}
            </Pressable>
        // </Pressable>
    )
}