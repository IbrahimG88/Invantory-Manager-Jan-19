import React, { Component } from 'react';


import { AppRegistry, SectionList, StyleSheet, Text, View, Button  } from 'react-native';

import {Header } from "native-base";


import { AsyncStorage} from 'react-native';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GrandList: ''
        };

        this.loadItems = this.loadItems.bind(this);
    }


    static navigationOptions = {
        drawerLabel: 'Inventory'
    };


    componentDidMount() {
        AsyncStorage.getItem("GrandList").then((value) => {
            const restoredGrandList = JSON.parse(value);
            this.setState({GrandList: restoredGrandList});

            console.log(this.state.GrandList);
        })
    };

    render() {
        let list = this.state.GrandList;
        console.log(list);
        return (
            <View  style={styles.container}>
                <Header />
                <SectionList
                    sections={[
                        {title: 'All', data: list},
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

export default Inventory;