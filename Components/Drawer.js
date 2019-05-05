import React, { Component } from 'react';

import { createAppContainer, createDrawerNavigator } from "react-navigation";

import { Image, Text, View} from 'react-native';

import {Container, Content , Button, Header, Icon, Left} from 'native-base';


import RegisterItem from "./RegisterItem";

import Inventory from "./Inventory";

import StocksHome from "./Stocks/stocks-component";

import StocksInput from "./Stocks/stocks-input";

import ReorderHome from "./Reorder/reorder";

import { AsyncStorage} from 'react-native';

class MyHomeScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Home'
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon name='ios-menu'
                              style={{
                                  color: "black",
                                  paddingLeft: 25,
                              }}
                              onPress={() => this.props.navigation.openDrawer()}/>
                    </Left>
                    <Text>App Home</Text>
                </Header>
                <Content>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"/>
                <Text> Home</Text>
            </Content>
            </Container>
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
    },
    Stocks: {
        screen: StocksHome,
    },
    StocksInput: {
        screen: StocksInput,
    },
    Reorder: {
        screen: ReorderHome,
    },

});

export default MyApp = createAppContainer(MyDrawerNavigator);