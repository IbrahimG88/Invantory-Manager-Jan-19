import React, { Component } from'react';

import{ Container, Header, Content, List, ListItem, Text, Input, Button, Icon, Left } from'native-base';


import{AsyncStorage} from"react-native";

class ReorderHome extends Component {
    constructor(props){
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

static navigationOptions= {
    drawerLabel: 'Reorder'
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

const searchInput = text;

const searchResults = [];

this.state.allItems.map((item)=> {
    if (searchInput !== '') {
        if (item.daysTillDepletion <= searchInput) {
            searchResults.push(item);
            this.setState({searchResults: searchResults});
        }
    }
    else if (searchInput === "") {
        this.setState({showAllItemsList: true})
    }
})
}



render() {
    const newLine = "/n";
return(

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

                <Input type="number" placeholder="days till reorder"
                       onChangeText={(text)=> {this.searchFunction(text)}} />

            </Header>
            <Content>

                    {this.state.allItems.map((item, index)=>{
                        if(this.state.showAllItemsList){
                        return(
                            <List>
                                <ListItem itemDivider>
                        <Text>{item.itemName}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>{item.brand}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Days till depletion: {item.daysTillDepletion}</Text>
                                </ListItem>
                            </List>
                        )}

                    })
                    }

                    {this.state.searchResults.map((item)=>{
                        if(this.state.showSearchedItems){
                        return(
                            <List>
                                <ListItem itemDivider>
                                    <Text>{item.itemName}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>{item.brand}</Text>
                                </ListItem>
                                <ListItem>
                                    <Text>Days till depletion: {item.daysTillDepletion}</Text>
                                </ListItem>
                            </List>
                        )}

                    })
                    }

            </Content>
        </Container>


    );
}
}
export default ReorderHome;