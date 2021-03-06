import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Constant from 'expo-constants';

export default Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const currentTheme = useSelector(state => {
    return state.myDarMode;
  });
  const myColor= colors.iconColor;
  return (
    <View style={{
        marginTop:Constant.statusBarHeight,
        height: 45,
        backgroundColor: colors.headerColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 4,
        // works with ios for shadow
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1.0 }}
    >
        <View style={{ flexDirection: 'row', margin: 5 }}>
          <AntDesign style={{marginLeft: 20}} name='youtube' size={32} color='red' />
          <Text style={{fontSize: 22, marginLeft: 5, fontWeight: 'bold', color: myColor}}>YouTube</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: 150, margin: 5}}>
            <Ionicons name='md-videocam' size={32} color={myColor} />
            <Ionicons name='md-search' size={32} color={myColor} onPress={() => navigation.navigate('search')} />
            <MaterialIcons name='account-circle' size={32} color={myColor} onPress={() => dispatch({type: "CHANGE_THEME", payload: !currentTheme })} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});