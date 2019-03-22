import React, { Component } from 'react';

import { Image, Text, View, TextInput, AsyncStorage} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

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
        this.getItem = this.getItem.bind(this);
        this.removeLastItem = this.removeLastItem.bind(this);
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

   // console.log(stringifiedGrandList);
        AsyncStorage.setItem("GrandList", stringifiedGrandList);
        //console.log(this.state.GrandList);
    }

    getItem (){
        AsyncStorage.getItem("GrandList").then((value) => {
            const restoredGrandList = JSON.parse(value);
            this.setState({GrandList: restoredGrandList});
            console.log(restoredGrandList);
        });


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

    render(){
        return(
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label><Text>Item Name</Text></Label>
                            <Input onChangeText={(text) => this.setState({itemName: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label><Text> Category </Text></Label>
                            <Input onChangeText={(text) => this.setState({category: text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label><Text> Device</Text> </Label>
                            <Input onChangeText={(text) => this.setState({device: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label><Text> Brand </Text></Label>
                            <Input onChangeText={(text) => this.setState({brand: text})}/>
                        </Item>
                        <Button
                            onPress={this.saveItem}
                            title="Save Item"><Text>Save</Text></Button>
                        <Button
                            onPress={this.getItem}
                            title="get Item"><Text>get</Text></Button>
                        <Button
                            onPress={this.removeLastItem}
                            title="remove Item"><Text>remove item</Text></Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
export default RegisterItem;