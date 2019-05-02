import React, { Component } from'react';

import{ Container, Header, Content, List, ListItem, Text, Input, Button } from'native-base';


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

getItem() {
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

                <Button
                    onPress={this.getItem}
                    title="get Item"><Text>get</Text></Button>
            </Content>
        </Container>


    );
}
}
export default ReorderHome;