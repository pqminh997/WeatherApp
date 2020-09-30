import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DailyWeather = ({ title, temp, icon }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.title}>{temp}</Text>
                <Image style={styles.icon} source={{ uri: icon }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: 50,
        height: 50
    }
})

export default DailyWeather;