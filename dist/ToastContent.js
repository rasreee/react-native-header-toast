import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const ToastContent = ({ title, icon, message, onPress, backgroundColor, textColor, }) => {
    return (<TouchableOpacity onPress={onPress} style={[styles.root, { backgroundColor: backgroundColor }]}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <View style={styles.textWrapper}>
        <Text numberOfLines={2} style={[styles.title, { color: textColor }]}>
          {title}
        </Text>
        {message ? (<Text numberOfLines={2} style={(styles.message, { color: textColor })}>
            {message}
          </Text>) : null}
      </View>
    </TouchableOpacity>);
};
export default ToastContent;
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 18,
        alignItems: 'stretch',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.15,
        flexDirection: 'row',
        height: '100%',
    },
    icon: {
        width: 45,
        height: 45,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        color: '#444',
        fontSize: 16,
        fontWeight: '600',
    },
    message: {
        fontSize: 13,
        color: '#777',
    },
});
