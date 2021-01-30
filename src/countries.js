import React, { Component } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem, Icon, SearchBar  } from 'react-native-elements';
import { styles } from './config/styles';
import { IpAddress, XAccessToken } from './config/constants';


export default class Countries extends Component {

    
    constructor(props) {

        super(props);

        this.state = {
            data: null,
            countries: [],
            refreshing: false,

            searchText: "",
            filteredCountries: [],


        };
    }


    componentDidMount () {
        this.getData();
    }


    getData = async () =>{

        fetch(IpAddress+'countries', {
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
            // console.log(responseJson);

            this.setPageData(responseJson);
      
        })
        .catch((error) => {
          console.log(error)
        });
    }




    setPageData (countries) {
        
        var countryssArr = [];
        for (var i = 1; i < countries.length; i++) {
            countryssArr.push({
                id: i,
                name: countries[i].Country,
                slug: countries[i].Slug
            });
            
        }

        countryssArr.sort((a, b) => a.name.localeCompare(b.name));

        // console.log(countryssArr);

        this.setState({
            data: false,
            countries: countryssArr,
            refreshing: false
        })
    }
  


    handleRefresh= () =>{
        this.setState({ refreshing: true });
        this.getData();
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


    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#EEE",
            }}
          />
        );
    };



    search = (searchText) => {
        this.setState({searchText: searchText});
        
        console.log(this.state.countries)
        let filteredCountries = this.state.countries.filter(function (item) {
          return item.name.includes(searchText);
        });
      
        this.setState({filteredCountries: filteredCountries});
    };



    renderPage() {

        const { container} = styles;
    
    
        return (
            <SafeAreaView style={ container }>
    
                <SearchBar
                    round={true}
                    lightTheme={true}
                    placeholder="Search..."
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.search}
                    value={this.state.searchText}
                />


                <FlatList
                    // style={{ flex: 2}}
                    data={this.state.filteredCountries && this.state.filteredCountries.length > 0 ? this.state.filteredCountries : this.state.countries }
                    renderItem={({ item }) => (
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("CountryInfo", { country_name: item.name, slug: item.slug})}>
                                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                </ListItem.Title>
                                
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )}
                    keyExtractor={item => item.id.toString() }
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderSeparator}
                    refreshing={this.state.refreshing}
                    onRefresh={ this.handleRefresh } 
                    
                />
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