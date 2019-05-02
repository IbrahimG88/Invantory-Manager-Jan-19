import React, {Component} from "react";

import { Container, Header, Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import {AsyncStorage} from "react-native";



//you get navigated to this page eith from stock or inventory or any page
//NOT ALLOWED TO HEAD TO THIS COMPONENT FROM DRAWER
class StocksInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allItems: [],
            itemName:'',
            brand:'',
            device:'',
            category: '',
            unit: '',
            testsPerUnit: '',
            consumptionRate:'',
            daysTillDepletion: '',
        };

        this.saveItem = this.saveItem.bind(this);
    }


    //global variables
    daysTillDepletion;




    static navigationOptions = {
        drawerLabel: 'StocksInput'
    };


    componentDidMount(){
        this.willFocusListener = this.props.navigation.addListener("willFocus", ()=> {
            this.loadParams();
        })
    }

    componentWillUnmount(){
        this.willFocusListener.remove();
    }

    loadParams(){
        const { navigation } = this.props;
        const newItemToStock = {};
        newItemToStock.itemName = navigation.getParam('itemName', 'item name');
        newItemToStock.category = navigation.getParam('category', 'category');
        newItemToStock.device = navigation.getParam('device', 'device');
        newItemToStock.brand = navigation.getParam('brand', 'brand');
        console.log(' my time machine:'+ newItemToStock.brand);

        this.setState({
            itemName:navigation.getParam('itemName', 'item name'),
            brand: navigation.getParam('brand', 'brand'),
            device: navigation.getParam('device', 'device'),
            category: navigation.getParam('category', 'category'),
        })

    }




    saveItem(){


        const parametersIndex = this.props.navigation.getParam("index","default value");

        let beforeList = [...this.state.allItems];

        const stockedItem = {
            itemName:this.state.itemName,
            brand:this.state.brand,
            device:this.state.device,
            category: this.state.category,
            unit: this.state.unit,
            testsPerUnit:this.state.testsPerUnit,
            consumptionRate:this.state.consumptionRate,
            daysTillDepletion: this.daysTillDepletion,
        };

        beforeList[parametersIndex] = stockedItem;

        this.setState({allItems: beforeList});

        console.log("stocked item:" + JSON.stringify(stockedItem));
        console.log("beforeList"+ JSON.stringify(beforeList));



        const stringifiedGrandList = JSON.stringify(beforeList);

        // console.log(stringifiedGrandList);
        AsyncStorage.setItem("GrandList", stringifiedGrandList);
        //console.log(this.state.GrandList);

        this.setState({
            itemName:'',
            brand:'',
            device:'',
            category: '',
            unit: '',
            testsPerUnit: '',
            consumptionRate:'',
            daysTillDepletion: '',
        });
    }





    render() {

       let totalNumberOfTests = this.state.unit* this.state.testsPerUnit;

        this.daysTillDepletion = totalNumberOfTests / this.state.consumptionRate;
        console.log("days:2 "+ this.daysTillDepletion);
        console.log("days:state"+ this.state.daysTillDepletion);



        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Item Name</Label>
                            <Text>{this.state.itemName}</Text>
                        </Item>
                        <Item stackedLabel>
                            <Label>Category</Label>
                            <Text> {this.state.category}</Text>
                        </Item>
                        <Item stackedLabel>
                            <Label>Brand</Label>
                            <Text> {this.state.brand}</Text>
                        </Item>
                        <Item stackedLabel>
                            <Label>Device</Label>
                            <Text> {this.state.device}</Text>
                        </Item>
                        <Item stackedLabel>
                            <Label>Unit</Label>
                            <Input
                                value = {this.state.unit}
                                onChangeText={(text)=> {this.setState({unit : text})}}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Consumption rate of units per month</Label>
                            <Input
                                value = {this.state.consumptionRate}
                                onChangeText={(text)=> {this.setState({consumptionRate : text})}}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Tests per a single unit</Label>
                            <Input
                                value = {this.state.testsPerUnit}
                                onChangeText={(text)=> this.setState({testsPerUnit : text})}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Days till depletion of all tests</Label>
                            <Input />
                            <Text>{this.daysTillDepletion}

                            </Text>


                        </Item>
                        <Text> {"\n"}</Text>
                        <Button
                            onPress={this.saveItem}
                            title="Save Item"
                            style = {{
                                alignSelf: "center",
                            }}><Text>Save Item</Text></Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}


export default StocksInput;