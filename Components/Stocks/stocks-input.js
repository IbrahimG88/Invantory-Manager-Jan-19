import React, {Component} from "react";

import { Container, Header, Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import {AsyncStorage} from "react-native";

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


        this.setCurrentItem = this.setCurrentItem.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }


    //global variables
    daysTillDepletion;




    static navigationOptions = {
        drawerLabel: 'StocksInput'
    };



    setCurrentItem(){



        const parametersIndex = this.props.navigation.getParam("index","default value");
        const currentItem = this.state.allItems[parametersIndex];
        this.setState({itemName: currentItem.itemName,
            brand:currentItem.brand,
            category:currentItem.category,
            device: currentItem.device,
            unit: currentItem.unit,
            testsPerUnit: currentItem.testsPerUnit,
            consumptionRate:currentItem.consumptionRate,
            daysTillDepletion: currentItem.daysTillDepletion
        });
    };


    saveItem(){


        const parametersIndex = this.props.navigation.getParam("index","default value");

        //[...allItems]
        //const item = {}
        //const stockeditem;
        //currentItem = stockedItem;
        //condole.log allitems and currentItem
        //asyncstorage set the grandlist

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



    componentDidMount() {
        let allItemsList = [];
        AsyncStorage.getItem('GrandList').then((value) => {
            const restoredArray = JSON.parse(value);
            allItemsList.push(value);
            console.log(restoredArray);
            this.setState({'allItems': restoredArray });
            console.log(this.state.allItems);
        });



    }


    render() {

        this.daysTillDepletion = this.state.unit* this.state.consumptionRate;
        console.log("days:2 "+ this.daysTillDepletion);
        console.log("days:state"+ this.state.daysTillDepletion);



        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Button
                            onPress={this.setCurrentItem}
                            title="Add stocks"><Text>Add Stocks</Text></Button>

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
                            <Label>Consumption rate</Label>
                            <Input
                                value = {this.state.consumptionRate}
                                onChangeText={(text)=> {this.setState({consumptionRate : text})}}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Tests per unit</Label>
                            <Input
                                value = {this.state.testsPerUnit}
                                onChangeText={(text)=> this.setState({testsPerUnit : text})}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Days till depletion</Label>
                            <Input />
                            <Text>{this.daysTillDepletion}

                            </Text>


                        </Item>
                        <Button
                            onPress={this.saveItem}
                            title="Save Item"><Text>Save Item</Text></Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}


export default StocksInput;