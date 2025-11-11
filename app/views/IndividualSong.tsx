import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'IndividualSong'>;

export default function IndividualSong({ route,navigation }: Props) {
    const { song } = route.params;
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.6);
  return (
    <LinearGradient
      colors={['#0D77FF', '#0B0B0B', '#000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}> <Ionicons name="arrow-back" size={26} color="#fff" /></TouchableOpacity>
      </View>

      <Image source={song.coverImage} style={styles.albumImage} />

      <View style={styles.songInfo}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>

      
       <View style={styles.volumeContainer}>
        <Ionicons name="volume-low" size={22} color="#fff" />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          minimumTrackTintColor="#0D77FF"
          maximumTrackTintColor="#333"
          thumbTintColor="#0D77FF"
          onValueChange={(value) => setVolume(value)}
        />
        <Ionicons name="volume-high" size={22} color="#fff" />
      </View>

      
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>1:25</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.timeText}>3:32</Text>
      </View>

      
      <View style={styles.mainControls}>
        <Ionicons name="play-skip-back" size={32} color="#fff" />
        <TouchableOpacity
          onPress={() => setIsPlaying(!isPlaying)}
          style={styles.playButton}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color="#0D77FF"
          />
        </TouchableOpacity>
        <Ionicons name="play-skip-forward" size={32} color="#fff" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nowPlaying: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  albumImage: {
    width: 260,
    height: 260,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 50,
  },
  songInfo: {
    alignItems: 'center',
    marginTop: 25,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  artist: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginHorizontal: 30,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#333',
    marginHorizontal: 10,
    borderRadius: 2,
  },
  progressFill: {
    width: '35%',
    height: '100%',
    backgroundColor: '#0D77FF',
    borderRadius: 2,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 35,
  },
  playButton: {
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
