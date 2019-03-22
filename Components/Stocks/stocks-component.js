import React, { Component } from 'react';

import{ Container, Header, Content, List, ListItem, Text, Input, Button } from 'native-base';

import {AsyncStorage} from "react-native";

class StocksHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allItems: [],
            searchResults: [],
            showSearchedItems: true,
            showAllItemsList: true,
            editActive: false
        };
    this.searchFunction = this.searchFunction.bind(this);

    this.press = this.press.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Stocks'
    };

    componentDidMount() {
    let allItemsList = [];
        AsyncStorage.getItem('GrandList').then((value) => {
        const restoredArray = JSON.parse(value);
            allItemsList.push(value);
            console.log(restoredArray);
        this.setState({'allItems': restoredArray });

        });

    }



    searchFunction (text) {
    this.setState({showAllItemsList: false,
            searchResults: []
        });

     const searchInput = text.toUpperCase();

    const searchResults = [];

    this.state.allItems.map((item)=>{
        if(item.itemName.toUpperCase().indexOf(searchInput)> -1){
                searchResults.push(item);
            this.setState({searchResults: searchResults});
            }
        })
    }

    press(){
        console.log("I was pressed");
    }

    render() {
        return (

            <Container>
                <Header>
                    <Input type="search" placeholder="search for ..."
                           onChangeText={(text)=> {this.searchFunction(text)}} />

                </Header>
                <Content>
                    <List>
                        {this.state.allItems.map((item, index)=>{
                            if(this.state.showAllItemsList){
                            return(
                            <ListItem >
                            <Text onPress={() => this.props.navigation.navigate('StocksInput', {
                                index: index,
                            })}>{item.itemName}</Text>

                            </ListItem>)}

                        })
                        }


                    </List>
                    <List>
                        {this.state.searchResults.map((item, index)=>{
                            if(this.state.showSearchedItems){
                            return(
                            <ListItem >
                                <Text onPress={() => this.props.navigation.navigate('StocksInput', {
                                    index: index,
                                })}>{item.itemName}</Text>
                             </ListItem>
                            )}})}

                    </List>
                </Content>
            </Container>


        );
    }
}
export default StocksHome;




