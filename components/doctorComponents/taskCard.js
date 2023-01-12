import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import colors from '../../Colors';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';

export default class TaskCard extends React.Component {

    getEndTime(){
        var hour = this.props.time.split(":")[0];
        var minute = this.props.time.split(":")[1];
        //console.log(hour + " + " + minute);
        var date = moment.utc()
                   .hour(hour)   // numbers from 0 to 23
                   .minute(minute); // numbers from 0 to 59
        var plus30Min = date.add(30, 'm');
        //var time = "" + plus30Min.getHours() + "" + plus30Min.getMinutes() + "";


        console.log(plus30Min);
        console.log(this.props.time);
        var x = plus30Min.format("HH:mm");
        console.log("Moment", x);
        return x;
    }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle == undefined ? null: this.props.containerStyle ]}>

            <View style={{justifyContent:'space-between'}}>
            <View style={styles.row}>
                <View style={styles.iconContainer}>
                    <Feather name='bell' size={24} color='#454545' />
                </View>
            
            <View style={{marginLeft:8}}>
                <Text style={styles.bold}>{this.props.name}</Text>
                <Text style={styles.regular}>{this.props.date}</Text>
            </View>
            </View>
            <View style={styles.row}>
                <View style={styles.tag}>
                     <Text style={styles.medium}>{this.props.doctor}</Text>
                </View>
                <View style={styles.tag}>
                     <Text style={styles.medium}>{this.props.age}</Text>
                </View>
            </View>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={[styles.bold, {fontSize:14} ]}>{this.props.time}</Text>
                <View style={{height:80, width: 1, borderRadius:50,backgroundColor:'#fff', marginVertical:3 }} />
                <Text style={[styles.bold, {fontSize:14} ]}>{this.getEndTime()}</Text>
            </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
    container:{
        padding : 16, 
        flexDirection:'row',
        borderRadius: 15,
        marginVertical: 10,
        justifyContent:'space-between',

        
    },
    bold: {
        color: colors.black,
        fontSize: 18,
        color:'#fff',
        fontWeight:'700',
    },
    medium:{
        color: colors.black,
        fontSize: 14,
        fontWeight:'600'
    },
    regular:{
        color: '#fff',
        fontSize: 14,
    },
    row: {
        flexDirection:'row',
        alignItems:'center',
    },
    iconContainer:{
        height: 38,
        width: 38, 
        borderRadius:50, 
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#fff', 
    },  
    tag:{
        borderRadius:8,
        backgroundColor:'#fff',
        paddingVertical:4,
        paddingHorizontal:8,
        marginRight: 12,

    }
});