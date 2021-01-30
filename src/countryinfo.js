import React, { Component } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './config/styles';


export default class CountryInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            country_name: this.props.route.params.country_name,
            data: null,

        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({title: this.state.country_name});
        
        // this.fetchData();
    }



    render() {

        const { container, homePageIntroText, cardCases, cardCasesLeft, cardCasesRight, homePageBarChart } = styles;

        return (

            <SafeAreaView style={ container }>
                <ScrollView>
                    <View style={ homePageIntroText }>
                        <Text>Daily New Cases for 30 days</Text>
                    </View>

                    <View style={ homePageBarChart }>
                        <Text>Bar chart goes in here</Text>
                    </View>



                    <View style={ cardCases }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Cases</Text>
                            <Text>14,287,955</Text>
                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Cases</Text>
                            <Text>233,390</Text>
                        </View>
                    </View>




                    <View style={ cardCases }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Deaths</Text>
                            <Text>14,287,955</Text>
                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Deaths</Text>
                            <Text>233,390</Text>
                        </View>
                    </View>





                    <View style={ cardCases }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Recovered</Text>
                            <Text>14,287,955</Text>
                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Recovered</Text>
                            <Text>233,390</Text>
                        </View>
                    </View>



                </ScrollView>
            </SafeAreaView>
        );
    }
};