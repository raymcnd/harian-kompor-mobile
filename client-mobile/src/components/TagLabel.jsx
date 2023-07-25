import { Text, View } from "react-native";

export default function TagLabel({ tag }) {
    return (
        <Text style={{ fontSize: 14, backgroundColor: "#d9d9d9", padding: 5 }}>{ tag.name }</Text>
    )
}