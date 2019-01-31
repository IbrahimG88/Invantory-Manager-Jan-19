import React, { Component } from 'react';

import { createAppContainer, createDrawerNavigator } from "react-navigation";
import { Image, Button, Text, View} from 'react-native';

import RegisterItem from "./RegisterItem";

import Inventory from "./Inventory";



class MyHomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Home'
    };

    render() {
        return (
            <View>
                <Text>dhdhdhdhdhdhdh</Text>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"/>
                <Text> Home</Text>

            </View>
        );
    }
}

class MyNotificationsScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Notifications'
    };

    render() {
        return (
            <View>
                <Text>dhdhdhdhdhdhdh</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back home"
                />
            </View>
        );
    }
}



const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: MyHomeScreen,
    },
    Notifications: {
        screen: MyNotificationsScreen,
    },
    RegisterItem: {
        screen: RegisterItem,
    },
    Inventory: {
        screen: Inventory,
    }
});

export default MyApp = createAppContainer(MyDrawerNavigator);