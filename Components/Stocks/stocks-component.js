import React, { Component } from 'react';

import{ Container, Header, Content, List, ListItem, Text, Input, Button, Icon, Left } from 'native-base';

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
        this.getItem = this.getItem.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Stocks'
    };

    componentDidMount(){
        this.wilFocusListener = this.props.navigation.addListener("willFocus", ()=> {
            this.getItem();
        })
    }


getItem() {
    let allItemsList = [];
    AsyncStorage.getItem('GrandList').then((value) => {
        const restoredArray = JSON.parse(value);
        allItemsList.push(value);
        console.log(restoredArray);
        this.setState({'allItems': restoredArray });

    });
}

    componentWillUnmount (){
        this.wilFocusListener.remove();
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




