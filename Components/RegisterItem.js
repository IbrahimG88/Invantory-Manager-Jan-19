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

        this.setState({
            GrandList: this.state.GrandList.push(item)});
        console.log(this.state.GrandList);
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
                    </Form>
                </Content>
            </Container>
        );
    }
}
export default RegisterItem;