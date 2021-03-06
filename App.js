import React from "react";
import { Text, View, Button, Image } from "react-native";
import { createStackNavigator } from "react-navigation";

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require("./spiro.png")}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate("MyModal")}
          title="Info"
          color="#fff"
        />
      ),
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={
            // this conditional is to remove the warning of a null onPress upon initial render
            navigation.state.params
              ? navigation.getParam("increaseCount")
              : () => {}
          }
          title="+1"
          color="#fff"
        />
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = { count: 0 };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Text>{this.state.count}</Text>
        <Button
          title="Go to Details"
          onPress={() =>
            this.props.navigation.navigate("Details", {
              itemId: 86,
              otherParams: "Details"
            })
          }
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : "A Nested Details Screen",
      // These values are used instead of the shared configuration
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };
  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Text>itemId: {itemId}</Text>
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
        <Button
          title="Update Header"
          onPress={() => navigation.setParams({ otherParams: "Updated!" })}
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    MyModal: {
      screen: ModalScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
