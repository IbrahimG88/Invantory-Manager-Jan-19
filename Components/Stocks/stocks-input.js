import React, {Component} from "react";

import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';
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

        this.calculation = this.calculation.bind(this);
        this.setCurrentItem = this.setCurrentItem.bind(this);
    }


    //global variable
    daysTillDepletion;




    static navigationOptions = {
        drawerLabel: 'StocksInput'
    };

     calculation() {
         this.setState({daysTillDepletion: this.daysTillDepletion});
     }

     setCurrentItem(){
         const parametersIndex = this.props.navigation.getParam("index","default value");
         const currentItem = this.state.allItems[parametersIndex];
         this.setState({itemName: currentItem.itemName,
             brand:currentItem.brand,
             category:currentItem.category
             ,device: currentItem.device});
     };


    componentDidMount() {
        let allItemsList = [];
        AsyncStorage.getItem('GrandList').then((value) => {
            const restoredArray = JSON.parse(value);
            allItemsList.push(value);
            console.log(restoredArray);
            this.setState({'allItems': restoredArray });
            this.setCurrentItem();
            console.log(this.state.allItems);
        });

    }

    render() {
        let unit;
        let consumptionRate;
        let testsPerUnit;
         this.daysTillDepletion = this.state.unit* this.state.consumptionRate;
        console.log("days:2 "+ this.daysTillDepletion);
        console.log("days:state"+ this.state.daysTillDepletion);



        return (
            <Container>
                <Header/>
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Item Name</Label>
                            <Input value={this.state.itemName}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Item Name</Label>
                            <Input value={this.state.category}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Brand</Label>
                            <Input value={this.state.brand}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Device</Label>
                            <Input value={this.state.device}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Unit</Label>
                            <Input
                                value = {unit}
                                onChangeText={(text)=> {this.setState({unit : text}); this.calculation()}}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Consumption rate</Label>
                            <Input
                                value = {consumptionRate}
                                onChangeText={(text)=> {this.setState({consumptionRate : text}); this.calculation()}}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Tests per unit</Label>
                            <Input
                                value = {testsPerUnit}
                                onChangeText={(text)=> this.setState({testsPerUnit : text})}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Days till depletion</Label>
                            <Input />
                            <Text>{this.daysTillDepletion}

                                </Text>


                        </Item>

                    </Form>
                </Content>
            </Container>
        );
    }
}


export default StocksInput;