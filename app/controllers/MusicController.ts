import { Audio } from 'expo-av';
import { Song, songs } from '../models/Songs';

let currentSound: Audio.Sound | null = null;
let isLoaded = false;

export const MusicController = {
  //Precargar la canción en memoria sin reproducir
  async loadSong(song: Song) {
    try {
      if (currentSound) {
        await currentSound.unloadAsync();
        currentSound = null;
        isLoaded = false;
      }

      const { sound } = await Audio.Sound.createAsync(song.audioFile, {
        shouldPlay: false,
        volume: 0.6,
      });

      currentSound = sound;
      isLoaded = true;
      console.log('Canción precargada:', song.title);
    } catch (error) {
      console.error('Error al cargar la canción:', error);
    }
  },

  // Reproducir cuando ya esté cargada la canción
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

  // Devuelve progreso actual para la barra de progreso de minutos
  async getStatus() {
    if (currentSound) {
      const status = await currentSound.getStatusAsync();
      return status;
    }
    return null;
  },

  // Retroceder 10 seg
  async minusTen(seconds: number = 10) {
    if (currentSound) {
      const status = await currentSound.getStatusAsync();
      if (status.isLoaded) {
        const newPos = Math.max(status.positionMillis - seconds * 1000, 0);
        await currentSound.setPositionAsync(newPos);
      }
    }
  },

  // Adelantar 10 seg
  async plusTen(seconds: number = 10) {
    if (currentSound) {
      const status = await currentSound.getStatusAsync();
      if (status.isLoaded && status.durationMillis) {
        const newPos = Math.min(
          status.positionMillis + seconds * 1000,
          status.durationMillis
        );
        await currentSound.setPositionAsync(newPos);
      }
    }
  },

  // Mover a una posición específica con el slider de progreso
  async certainTime(positionMillis: number) {
    if (currentSound) {
      const status = await currentSound.getStatusAsync();
      if (status.isLoaded) {
        await currentSound.setPositionAsync(positionMillis);
      }
    }
  },
};
