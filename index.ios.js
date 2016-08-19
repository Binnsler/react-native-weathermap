import React from 'react';
import {AppRegistry, MapView, Text, View, StyleSheet} from 'react-native';
import Api from './src/api';

var Weather = React.createClass({

  getInitialState: function(){
    return {
      pin: {
        latitude: 0,
        longitude: 0,
      },
      city: '',
      temperature: '',
      description: ''
    }
  },

  render: function(){

    return (
      <View style={styles.container}>
        <MapView
          annotations={[this.state.pin]}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}
        ></MapView>
        <View style={styles.textContainer}>
          <Text style={styles.text}>City: {this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>Description: {this.state.description}</Text>
        </View>
      </View>
    );
  },

  onRegionChangeComplete: function(region){

    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude
      }
    });

    Api(region.latitude, region.longitude)
      .then(function(data){
        this.setState(data)
      }.bind(this));
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    flex: 5,
    marginTop: 30
  },

  textContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: 20
  }
});

AppRegistry.registerComponent('weather', function(){return Weather});
