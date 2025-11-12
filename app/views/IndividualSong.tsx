import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { MusicController } from '../controllers/MusicController';
import { logInfo, logWarn, logError } from '../utils/logger';

type Props = NativeStackScreenProps<RootStackParamList, 'IndividualSong'>;

export default function IndividualSong({ route, navigation }: Props) {
  const { song } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    // precargar canción 
    MusicController.loadSong(song);
    logInfo(`Pasamos a pantalla IndividualSong de: ${song.title}`);

    // actualizar barra cada 500 ms
    const interval = setInterval(async () => {
      const status = await MusicController.getStatus();
      if (status && status.isLoaded) {
        setCurrentTime(status.positionMillis);
        setDuration(status.durationMillis || 1);
        setProgress(status.positionMillis / (status.durationMillis || 1));
      }
    }, 500);

    // detener audio al salir
    return () => {
      clearInterval(interval);
      MusicController.stopSong();
      logInfo(`Saliendo de pantalla IndividualSong: ${song.title}`);
    };
  }, []);

  //Para el play, si está corriendo la canción y le das click al botón, pausa la música. Si no está corriendo,  le pone play 
  const play = async () => {
    try {
      if (isPlaying) {
        await MusicController.pauseSong();
        setIsPlaying(false);
      } else {
        await MusicController.playSong(song);
        setIsPlaying(true);
      }
    } catch (error) {
      await logError('Error al pausar/despausar reproducción', error);
    }
} ;

  const handleVolumeChange = async (value: number) => {
    setVolume(value);
    await MusicController.setVolume(value);
  };

  const handleSkip = async (value: number) => {
    const newPosition = value * duration;
    await MusicController.certainTime(newPosition);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <LinearGradient
      colors={['#0D77FF', '#0B0B0B', '#000']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image source={song.coverImage} style={styles.albumImage} />

      <View style={styles.songInfo}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>

      {/* Volumen */}
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
          onValueChange={handleVolumeChange}
        />
        <Ionicons name="volume-high" size={22} color="#fff" />
      </View>

      {/* Progreso */}
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Slider
          style={{ flex: 1, marginHorizontal: 10 }}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          minimumTrackTintColor="#0D77FF"
          maximumTrackTintColor="#333"
          thumbTintColor="#0D77FF"
          onSlidingComplete={handleSkip}
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Controles principales */}
      <View style={styles.mainControls}>
        <TouchableOpacity onPress={() => MusicController.minusTen(10)}>
          <MaterialIcons name="replay-10" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={play} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color="#0D77FF"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => MusicController.plusTen(10)}>
          <MaterialIcons name="forward-10" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  albumImage: { width: 260, height: 260, borderRadius: 10, alignSelf: 'center', marginTop: 50 },
  songInfo: { alignItems: 'center', marginTop: 25 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  artist: { color: '#ccc', fontSize: 16, marginTop: 4 },
  volumeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginHorizontal: 10 },
  slider: { flex: 1, marginHorizontal: 10 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 25 },
  timeText: { color: '#aaa', fontSize: 12 },
  mainControls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 35 },
  playButton: { backgroundColor: '#fff', width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' },
});
