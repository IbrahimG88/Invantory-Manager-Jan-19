import React, { Component } from 'react';

import { Image, Text, View, TextInput, AsyncStorage} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

import { StocksInput } from "./Stocks/stocks-input";

class RegisterItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
                itemName: "",
                category: "",
                device: "",
                brand: "",
            GrandList: []
        };
        this.saveItem = this.saveItem.bind(this);

        this.removeLastItem = this.removeLastItem.bind(this);
        this.addStocksForItem = this.addStocksForItem.bind(this);
    }

    static navigationOptions = {
        drawerLabel: "Register item"
    };

    saveItem(){
        const item = {};
        item.itemName = this.state.itemName;
        item.category = this.state.category;
        item.device = this.state.device;
        item.brand = this.state.brand;

        const theArray = [...this.state.GrandList];
        theArray.push(item);

        this.setState({GrandList: theArray});
        console.log(theArray);

    const stringifiedGrandList = JSON.stringify(theArray);

        this.setState({
            itemName: "",
            category: "",
            device: "",
            brand: "",
        });

   // console.log(stringifiedGrandList);
        AsyncStorage.setItem("GrandList", stringifiedGrandList);
        //console.log(this.state.GrandList);


    }


    removeLastItem () {
        const newArray = [...this.state.GrandList];
        newArray.slice(-1);


        this.setState({GrandList: newArray});


        const stringifiedGrandList = JSON.stringify(newArray);

        // console.log(stringifiedGrandList);
        AsyncStorage.setItem("GrandList", stringifiedGrandList);
        //console.log(this.state.GrandList);

    }

    //same as save item but takes this item and navigates to stocks-input component
    addStocksForItem(){
        const item = {};
        item.itemName = this.state.itemName;
        item.category = this.state.category;
        item.device = this.state.device;
        item.brand = this.state.brand;

        const theArray = [...this.state.GrandList];
        theArray.push(item);
        this.setState({GrandList: theArray});
        const stringifiedGrandList = JSON.stringify(theArray);
        this.setState({
            itemName: "",
            category: "",
            device: "",
            brand: "",
        });
        AsyncStorage.setItem("GrandList", stringifiedGrandList);

        this.props.navigation.navigate('StocksInput', {
            itemName: item.itemName,
            category: item.category,
            device: item.device,
            brand: item.brand,
        });
    }

    render(){
        return(
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label><Text>Item Name</Text></Label>
                            <Input
                                value={this.state.itemName}
                                onChangeText={(text) => this.setState({itemName: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label><Text> Category </Text></Label>
                            <Input
                                value={this.state.category}
                                onChangeText={(text) => this.setState({category: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label><Text> Device</Text> </Label>
                            <Input
                                value={this.state.device}
                                onChangeText={(text) => this.setState({device: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label><Text> Brand </Text></Label>
                            <Input
                                value={this.state.brand}
                                onChangeText={(text) => this.setState({brand: text})}/>
                        </Item>
                        <Text>{"\n"}</Text>
                        <Button success
                            onPress={this.saveItem}
                            title="Save Item"
                            style={{
                                    alignSelf:'flex-end',
                                    marginRight: 30,
                                    width: 60,
                                    justifyContent: 'center'
                                }}
                        ><Text>Save</Text></Button>
                        <Text>{"\n"}</Text>
                        <Button primary
                                onPress={this.addStocksForItem}
                                title="add Item's stocks"
                                style={{
                                    alignSelf:'flex-end',
                                    marginRight: 30,
                                    width: 180,
                                    justifyContent: 'center'
                                }}>
                            <Text>Add stocks for this item</Text></Button>

                        <Text>{"\n"}</Text>
                        <Button light
                            onPress={this.removeLastItem}
                            title="remove Item"
                            style={{
                                    alignSelf:'flex-end',
                                    marginRight: 30,
                                    width: 180,
                                    justifyContent: 'center'
                                }}>
                            <Text>remove last item added</Text></Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
export default RegisterItem;