import { Button, ScrollView, TextInput, View } from "react-native";

export default function Home() {
  return (
    <ScrollView>
      <View>
        <TextInput />
        <Button title="" onPress={console.log}></Button>
      </View>

      <View>

      </View>
    </ScrollView>
  )
}