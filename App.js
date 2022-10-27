import { StyleSheet, SafeAreaView, Text, Button, View, FlatList, Image} from "react-native";
import { useSpotifyAuth, millisToMinutesAndSeconds } from "./utils";
import { Images, Themes } from "./assets/Themes";
import { ScrollView } from "react-native-web";

// RENDERTRACK: renders one song listing
const renderTrack = ({ item, index }) => (
    <View style={[styles.item,{}]}>
      <View style={[styles.textSection, {flexDirection: 'row', alignItems: 'center'}]}>
        <Text style={[styles.name, {flex: 1}]}>{index + 1}</Text>
        <Image style={{flex: 2, resizeMode: 'contain', height: 50, marginRight: 12}} source={ { uri:item.album.images[0].url } }/>
        <View style={[{flex: 5}]}>
          <Text style={[styles.name]}>{item.name}</Text> 
          <Text style={[{color: Themes.colors.gray}]}>{item.album.artists[0].name}</Text> 
        </View>
        <Text style={[styles.name, {flex: 2, marginRight: 5}]}>{item.album.name}</Text>
        <Text style={[styles.name, {flex: 1}]}>{millisToMinutesAndSeconds(item.duration_ms)}</Text>
      </View>
    </View>
);

export default function App() {
  // Pass in true to useSpotifyAuth to use the album ID (in env.js) instead of top tracks
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth();

    if (token) {
      return ( //render flatlist
      
      <View style={[styles.container, {}]}>
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <View style={{marginBottom: 10,flexDirection: 'row', justifyContent:'center', alignItems: 'center', width: '55%'}}>
            <Image style={{flex: 2, resizeMode: 'contain', height: 25, marginRight: 1}} source={Images.spotify}/>
            <Text style={[styles.name, {fontSize: 24, fontWeight: 'bold'}]}>My Top Tracks</Text>
          </View>
        </View>
        
        <FlatList scroll={true}                                                                                
        data = {tracks} // just a fixed array
        renderItem = {renderTrack} // called in a for loop to produce list objects
        keyExtractor = {(item) => item.id} // take item, return id
        />
        
      </View>);


    } else {


      // render authbutton
      return (
        
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <View style={{marginBottom: 10,flexDirection: 'row', justifyContent:'center', alignItems: 'center', width: '65%'}}>
            <Image style={{flex: 2, resizeMode: 'contain', height: 25, marginRight: 1}} source={Images.spotify}/>
            <Button  title="CONNECT WITH SPOTIFY" color="green" onPress={getSpotifyAuth}/>
          </View>
          </View>
          <Image style={{resizeMode: 'contain', height: 25, marginRight: 1}} source={Images.spotify}/>
        </View>
        
      );


    }

  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:Themes.colors.background,
    padding: 20,
    paddingTop: 54,
    justifyContent: 'center',
    flex: 1,
    
  },

  authPage: {
    justifyContent: 'center',
    backgroundColor:Themes.colors.background,
    alignItems: 'center',
    flex: 1,
  },

  item: {
    padding: 10,
    width: '100%',
    flex: 1,
  },

  name: {
    color: Themes.colors.white,
  },
});