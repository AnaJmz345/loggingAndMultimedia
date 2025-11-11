import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MusicController } from '../controllers/MusicController';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import type { Song } from '../models/Songs';

type MusicPlayerNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MusicPlayer'>;
export default function MusicPlayerView() {
  const songs = MusicController.getSongs();
  const navigation = useNavigation<MusicPlayerNavigationProp>();

  return (
    <LinearGradient
      colors={['#0D77FF','#0B0B0B', '#0B0B0B','#0B0B0B', '#000000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView>
        <Text style={styles.name}>Musicx</Text>
        {songs.map((song) => (
            <TouchableOpacity 
                key={song.id} 
                style={styles.card}
                onPress={() => navigation.navigate('IndividualSong', { song })}
            >
                <Image source={song.coverImage} style={styles.image} />
                <View style={styles.details}>
                <Text style={styles.title}>{song.title}</Text>
                <Text style={styles.artist}>{song.artist}</Text>
                </View>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    width:'100%',
    flex: 1,
    padding: 20,
  
  },
  name:{
    color: 'white',
    fontSize: 60,
    marginBottom:60,
    paddingTop:30
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  artist: { 
    fontSize: 14, 
    color: '#aaa' 
  },
});
