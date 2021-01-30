import React, { Component } from 'react';
import { SafeAreaView, Text, View, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { LineChart, BarChart } from "react-native-chart-kit";
import { styles } from './config/styles';
import { default as NumberFormat } from 'react-number-format';
import { IpAddress, XAccessToken } from './config/constants';
const screenWidth = Dimensions.get("window").width;


export default class CountryInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            country_name:   this.props.route.params.country_name,
            slug:           this.props.route.params.slug,
            data:           null,

            totalCases:     'loading...',
            newCases:       'loading...',
            
            totalDeaths:    'loading...',
            newDeaths:      'loading...',

            totalRecovered: 'loading...',
            newRecovered:   'loading...',


            lineChartCases: [0],
            lineChartLabel: [0],



        }
    }

    componentDidMount() {
        this.props.navigation.setOptions({title: this.state.country_name});
        this.getData();
        
        let today = new Date().toISOString();

        let oneWeekAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();

        let countrySlug = this.state.slug;   

        this.getCountries(countrySlug, today, oneWeekAgo);
    }


    getCountries = async (countrySlug, today, oneWeekAgo) => {

        fetch(IpAddress+'country/'+countrySlug+'/status/confirmed?from='+oneWeekAgo.substring(0, 10)+'&to='+today.substring(0, 10), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': XAccessToken,
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('=========');
            // console.log(responseJson);

            this.processData(responseJson);
      
        })
        .catch((error) => {
          console.log(error)
        });
    }

    

    processData(responseJson) {

        let lineChartLabel = [];
        let lineChartCases = [];
        
        for (let i = 0; i < responseJson.length; i++) {

            if (i < responseJson.length-1) {
                let res = responseJson[i+1].Cases - responseJson[i].Cases

                lineChartLabel.push(responseJson[i+1].Date.substring(0, 10));
                lineChartCases.push(res);
                
            }
        }

        console.log("=======")
        console.log(lineChartCases);
        console.log(lineChartLabel);

        this.setState({lineChartCases: lineChartCases, lineChartLabel: lineChartLabel });
    }


    

    getData = async () =>{

        fetch(IpAddress+'summary', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Access-Token': XAccessToken,
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log('=========')

            if (responseJson == null || responseJson.length == 0) {

                Alert.alert(
                    "Response",
                    "No record found",
                    [
                        { text: "OK", onPress: () => this.props.navigation.goBack() }
                    ],
                    { cancelable: false }
                );
                
            }else {
                
                var pageslug = this.state.slug;
                var filteredRequest = responseJson.Countries.filter(function (item) {
                    return item.Slug.toLowerCase().includes(pageslug.toLowerCase());
                    
                });

                // console.log(filteredRequest);
                this.setPageData(filteredRequest);
            }
      
        })
        .catch((error) => {

            console.log(error);

            Alert.alert(
                "Error",
                "Unable to fetch this record. \nIf this error persists, it's likely that the data for the selected country/province might be unavailable",
                [
                    { text: "OK", onPress: () => this.props.navigation.goBack() }
                ],
                { cancelable: false }
            );
        });
    }





    setPageData (countryInfo) {


        this.setState({
            data: false,

            newCases:       countryInfo[0].NewConfirmed,
            totalCases:     countryInfo[0].TotalConfirmed,

            newDeaths:      countryInfo[0].NewDeaths,
            totalDeaths:    countryInfo[0].TotalDeaths,

            newRecovered:   countryInfo[0].NewRecovered,
            totalRecovered: countryInfo[0].TotalRecovered

            

            // NewConfirmed": 0, "NewDeaths": 0, "NewRecovered": 0, "Premium": {}, "Slug": "afghanistan", "TotalConfirmed": 54939, "TotalDeaths": 2399, "TotalRecovered"


        })
    }




    renderPage() {

        const { container, homePageIntroText, cardCases, cardCasesLeft, cardCasesRight, homePageBarChart, lastCardMarginBottom, deathFont, recoveredFont, generalCasesFont } = styles;

        const data = {
            labels: this.state.lineChartLabel,
            datasets: [
                {
                data: this.state.lineChartCases,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
                }
            ],
        };


        return (

            <SafeAreaView style={ container }>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <View style={ homePageIntroText }>
                        <Text>Daily New Cases for 30 days</Text>
                    </View>

                    



                    
                    <LineChart
                        style={ homePageBarChart }
                        verticalLabelRotation={30}
                        data={data}
                        width={screenWidth}
                        height={300}
                        chartConfig = {{
                            backgroundColor: "#5382B2",
                            backgroundGradientFrom: "#5382B2",
                            backgroundGradientTo: "#5382B2",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                            borderRadius: 16
                            },
                            propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                            }
                        }}
                    />





                    <View style={ cardCases }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Cases</Text>
                            <NumberFormat 
                                value={this.state.totalCases} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ generalCasesFont }>{formattedValue}</Text> }
                            />
                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Cases</Text>
                            <NumberFormat 
                                value={this.state.newCases} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ generalCasesFont }>{formattedValue}</Text> }
                            />
                        </View>
                    </View>




                    <View style={ cardCases }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Deaths</Text>
                            <NumberFormat 
                                value={this.state.totalDeaths} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ deathFont }>{formattedValue}</Text> }
                            />
                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Deaths</Text>
                            <NumberFormat 
                                value={this.state.newDeaths} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ deathFont }>{formattedValue}</Text> }
                            />
                        </View>
                    </View>





                    <View style={[cardCases, lastCardMarginBottom] }>
                        <View style={ cardCasesLeft }>
                            <Text>Total Recovered</Text>
                            <NumberFormat 
                                value={this.state.totalRecovered} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ recoveredFont }>{formattedValue}</Text> }
                            />
                        </View>


                        <View style={ cardCasesRight }>
                            <Text>New Recovered</Text>
                            <NumberFormat 
                                value={this.state.newRecovered} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                renderText={formattedValue => <Text style={ recoveredFont }>{formattedValue}</Text> }
                            />
                        </View>
                    </View>



                </ScrollView>
            </SafeAreaView>
        );
    }



    showLoader() {

        const { container} = styles;

        return (
            <SafeAreaView style={ container }>

                <View style={{ marginTop: 60, flex: 1, alignItems: 'center', justifyContent: 'center',  }}>
                <ActivityIndicator
                animating={true}
                size="large"
                color="#000"
                />
                </View>
                
            </SafeAreaView>
        );
    }




    render() {
         
        const { container } = styles;
          
        return (

            <SafeAreaView style={ container }>

                { this.state.data == null ?  this.showLoader() : this.renderPage() }

            </SafeAreaView>
        );
    }
    
};