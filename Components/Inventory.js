import React, { Component } from 'react';


import { AppRegistry, SectionList, StyleSheet, Text, View, Button, FlatList  } from 'react-native';


import{ Container, Header, Content, List, ListItem} from'native-base';





import { AsyncStorage} from 'react-native';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GrandList: [],
            isFetching: false
        };

       this.getItem = this.getItem.bind(this);

    }


    static navigationOptions = {
        drawerLabel: 'Inventory'
    };

    componentDidMount(){
        this.willFocusListener = this.props.navigation.addListener("willFocus", ()=> {
            this.someAction();
        })
    }

    componentWillUnmount(){
      this.willFocusListener.remove();
    }

    someAction(){
     console.log("I am focused");
        AsyncStorage.getItem("GrandList").then((value) => {
            const restoredGrandList = JSON.parse(value);
            this.setState({GrandList: restoredGrandList});
            //  console.log(restoredGrandList);
            console.log(this.state.GrandList);
        });
     return(
         <FlatList
             data={this.state.GrandList}
             extraData={this.state.GrandList}
             renderItem={({item})=>(
                 <List>
                     <ListItem itemDivider>
                         <Text>{item.itemName}</Text>
                     </ListItem>
                     <ListItem>
                         <ListItem>
                             <Text>Days till depletion: {item.daysTillDepletion}</Text>
                         </ListItem>
                     </ListItem>
                 </List>
             )}
         />
             )}





    getItem() {
        AsyncStorage.getItem("GrandList").then((value) => {
            const restoredGrandList = JSON.parse(value);
            this.setState({GrandList: restoredGrandList});
            //  console.log(restoredGrandList);
            console.log(this.state.GrandList);

        });
    }




    render() {
        return (
            <Container>
                <Header />
            <Content>
                    <FlatList
                        data={this.state.GrandList}
                        extraData={this.state.GrandList}
                        renderItem={({item})=>(
                            <List>
                            <ListItem itemDivider>
                                <Text>{item.itemName}</Text>
                            </ListItem>
                                <ListItem>
                                    <ListItem>
                                        <Text>Days till depletion: {item.daysTillDepletion}</Text>
                                    </ListItem>
                                </ListItem>
                            </List>

                        )}

                        />
            </Content>
            </Container>

        );
    }
}


export default Inventory;

