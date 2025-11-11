import { Audio } from 'expo-av';
import { Song, songs } from '../models/Songs';

let currentSound: Audio.Sound | null = null;
let isLoaded = false;

export const MusicController = {
  // ✅ Cargar la canción en memoria sin reproducir
  async loadSong(song: Song) {
    try {
      if (currentSound) {
        await currentSound.unloadAsync();
        currentSound = null;
        isLoaded = false;
      }

      const { sound } = await Audio.Sound.createAsync(song.audioFile, {
        shouldPlay: false, // solo cargar
        volume: 0.6,
      });

      currentSound = sound;
      isLoaded = true;
      console.log('Canción precargada:', song.title);
    } catch (error) {
      console.error('Error al cargar la canción:', error);
    }
  },

  // ✅ Reproducir (si ya está cargada, solo playAsync)
  async playSong(song?: Song) {
    try {
      if (currentSound && isLoaded) {
        await currentSound.playAsync();
      } else {
        await this.loadSong(song!);
        await currentSound?.playAsync();
      }
    } catch (error) {
      console.error('Error al reproducir:', error);
    }
  },

  // Pausar canción
  async pauseSong() {
    if (currentSound) {
      await currentSound.pauseAsync();
    }
  },

  // Reanudar canción
  async resumeSong() {
    if (currentSound) {
      await currentSound.playAsync();
    }
  },

  // Cambiar volumen
  async setVolume(value: number) {
    if (currentSound) {
      await currentSound.setVolumeAsync(value);
    }
  },

  // Detener
  async stopSong() {
    if (currentSound) {
      await currentSound.stopAsync();
    }
  },

  // Devuelve lista
  getSongs() {
    return songs;
  },

  // Devuelve progreso actual
  async getStatus() {
    if (currentSound) {
      const status = await currentSound.getStatusAsync();
      return status;
    }
    return null;
  },
};
