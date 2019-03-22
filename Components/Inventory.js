import React, { Component } from 'react';


import { AppRegistry, SectionList, StyleSheet, Text, View, Button  } from 'react-native';

import {Header } from "native-base";


import { AsyncStorage} from 'react-native';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GrandList: []
        };

        this.getItem = this.getItem.bind(this);

    }


    static navigationOptions = {
        drawerLabel: 'Inventory'
    };


    componentDidMount(){
      AsyncStorage.getItem("GrandList").then((value) => {
         const restoredGrandList = JSON.parse(value);
          this.setState({GrandList: restoredGrandList});
      });
    }

    getItem (){
        AsyncStorage.getItem("GrandList").then((value) => {
            const restoredGrandList = JSON.parse(value);
            this.setState({GrandList: restoredGrandList});
          //  console.log(restoredGrandList);
            console.log(this.state.GrandList);
        });
    };

    render() {
let theArray = this.state.GrandList;
        return (
            <View >
                <Header />
                <Text>hii</Text>
                <Button
                    onPress={this.getItem}
                    title="get Item"><Text>get</Text></Button>

                {theArray.map((item) => {
                    return(
                        <Text>Name: {item.itemName} {"\n"}
                        Brand: {item.brand}</Text>
                    );
                })}
            </View>

        );
    }
}


export default Inventory;

/*   */