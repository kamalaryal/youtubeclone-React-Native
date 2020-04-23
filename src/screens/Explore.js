import React from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const LittleCard = ({name}) => {
    return (
        <View style={{backgroundColor: 'red', width: 160, height: 50, borderRadius: 4, marginTop: 10}}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 22, marginTop: 5}}>{name}</Text>
        </View>
    )
}

const Explore = () => {

    const cardData = useSelector(state => {
        return state.cardData;
    });

   return(
       <View style={{flex:1}}>
           <Header />
           <SafeAreaView >
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                    <LittleCard name='Gaming' />
                    <LittleCard name='Trending' />
                    <LittleCard name='Music' />
                    <LittleCard name='News' />
                    <LittleCard name='Movies' />
                    <LittleCard name='Fashion' />
                </View>
                <Text style={{margin: 8, fontSize: 22, borderBottomWidth: 1}}>Trending Video</Text>
                <FlatList
                    data={cardData}
                    renderItem={({ item }) => {
                    return <Card
                        videoId={item.id.videoId}
                        title={item.snippet.title}
                        channel={item.snippet.channelTitle}
                    />
                    }}
                    keyExtractor={item=>item.id.videoId}
                />
           </SafeAreaView >
       </View>
   )
}

export default Explore;