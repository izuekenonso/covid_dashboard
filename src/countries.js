import React, { Component } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Icon  } from 'react-native-elements';
import { styles } from './config/styles';


export default class Countries extends Component {

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "90%",
              backgroundColor: "#EEE",
            }}
          />
        );
    };


    render() {

        const list = [
            {
                id: 1,
                country_name: 'Nigeria',
            },
            {
                id: 2,
                country_name: 'United Kingdom',
            },

        ];
          
        const { container } = styles;
          
        return (

            <SafeAreaView style={ container }>
                <FlatList
                    style={{ flex: 1}}
                    data={list}
                    renderItem={({ item }) => (
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title>
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("CountryInfo", { country_name: item.country_name})}>
                                        <Text>{item.country_name}</Text>
                                    </TouchableOpacity>
                                </ListItem.Title>
                                
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )}
                    keyExtractor={item => item.id.toString() }
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderSeparator}
                    
                />
            </SafeAreaView>
        );
    }
};