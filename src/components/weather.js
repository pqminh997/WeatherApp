import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Weather = ({ temp, icon, dayOfWeek, date, description, children }) => {
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.day}>{dayOfWeek}</Text>
                <Text style={styles.day}>{date}</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.temp}>{temp}°C</Text>
                <Text>{description}</Text>
            </View>

            <Image style={styles.img} source={{ uri: icon }} />
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        marginBottom: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    temp: {
        fontSize: 40,
    },
    day: {
        fontSize: 18,
    },
    img: {
        width: 80,
        height: 80

    },
    rangeTemp: {
        flexDirection: 'row'
    }
})

export default Weather;