import React, { Component } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './config/styles';


export default class Home extends Component {

    render() {

        const { container, homePageIntroText, cardCases, cardCasesLeft, cardCasesRight, homePageBarChart, searchByCountryButtonSection, searchByCountryText } = styles;

        return (

            <SafeAreaView style={ container }>
                <ScrollView>
                    <View style={ homePageIntroText }>
                        <Text>Daily New Cases for past week</Text>
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




                    <View>
                        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Countries') } style={ searchByCountryButtonSection }>
                            <Text style= { searchByCountryText}> Search By Country</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </SafeAreaView>
        );
    }
};