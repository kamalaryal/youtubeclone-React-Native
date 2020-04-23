import React, { useState } from 'react';
import { View, TextInput, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import MiniCard from '../components/MiniCard';
import { useTheme } from '@react-navigation/native';
import Constant from 'expo-constants';

export default Search = ({ navigation }) => {
    const { colors } = useTheme();
    const myColor= colors.iconColor;
    const [value, setValue] = useState('');
    // const [miniCard, setMiniCard] = useState('');
    const dispatch = useDispatch();
    const miniCard = useSelector(state => {
        return state.cardData;
    });
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyDvPeSWsnXeKmir1cqXCmzy4lmT4ClEBeE`)
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            // setMiniCard(data.items);
            dispatch({ type: 'ADD', payload: data.items });
        });
    }

    return (
        <View style={{flex: 1, marginTop:Constant.statusBarHeight}}>
            <View style={{
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                elevation: 5,
                backgroundColor: colors.headerColor,
                // works with ios for shadow
                shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 1.0 }}
            >
                <Ionicons style={{color: myColor}} name='md-arrow-back' size={32} onPress={() => navigation.goBack()} />
                <TextInput
                    value={value}
                    style={{width: '70%', backgroundColor: '#e6e6e6'}}
                    onChangeText={(text) => setValue(text)}
                />
                <Ionicons style={{color: myColor}} name='md-send' size={32} onPress={() => fetchData()} />
            </View>
            {
                loading ?
                <ActivityIndicator
                    size='large'
                    color='red'
                    style={{marginTop: 10}}
                />
                : null
            }

            <FlatList
                data={miniCard}
                renderItem={({item}) => {
                    return <MiniCard
                        videoId={item.id.videoId}
                        title={item.snippet.title}
                        channel={item.snippet.channelTitle}
                    />
                }}
                keyExtractor={item=>item.id.videoId}
            />
        </View>
    )
}