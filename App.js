import React from "react";
import { Text, View, Button } from "react-native";
import { createStackNavigator } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() =>
            this.props.navigation.navigate("Details", {
              itemId: 86,
              otherParam: "anything"
            })
          }
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    const otherParam = navigation.getParam("otherParam", "some default value");

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>itemId: {itemId}</Text>
        <Text>otherParam: {otherParam}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push("Details", {
              itemId: Math.floor(Math.random() * 100)
            })
          }
        />
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  { initialRouteName: "Home" }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
