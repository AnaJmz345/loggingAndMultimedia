import { Audio } from 'expo-av';
import { Song, songs } from '../models/Songs';
import { logInfo, logWarn, logError } from '../utils/logger';
import { Alert } from 'react-native';
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
      await logInfo(`Canción precargada: ${song.title}`);
    } catch (error) {
      await logError('Error al cargar canción', error);
      alert('Error al cargar la canción');
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
        await logInfo(`Reproduciendo: ${song?.title}`);

    } catch (error) {
      await logError('Error al reproducir canción', error);
    }
  },

  // Pausar canción
  async pauseSong() {
    try {
      if (currentSound) {
        await currentSound.pauseAsync();
        await logInfo('Canción pausada');
      }
    } catch (error) {
      await logError('Error al pausar', error);
      
    }
  },

  // Reanudar canción
  async resumeSong() {
    try {
      if (currentSound) {
        await currentSound.playAsync();
        await logInfo('Despausa');
      }
    } catch (error) {
      await logError('Error al despausar', error);
    }
  },

  // Cambiar volumen
  async setVolume(value: number) {
    try {
      if (currentSound) {
        await currentSound.setVolumeAsync(value);
        await logInfo(`Volumen cambiado a ${(value * 100).toFixed(0)}%`);
      }
    } catch (error) {
      await logError('Error al cambiar volumen', error);
    }
  },

  // Detener
  async stopSong() {
    try {
      if (currentSound) {
        await currentSound.stopAsync();
        await logInfo('Canción detenida');
      }
    } catch (error) {
      await logError('Error al detener canción', error);
    }
  },

  // Devuelve lista
  getSongs() {
    logInfo('Solicitando lista de canciones');
    return songs;
  },

  // Devuelve progreso actual para la barra de progreso de minutos
  async getStatus() {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        return status;
      }
      return null;
    } catch (error) {
      await logError('Error al obtener estado del audio', error);
      return null;
    }
  },

  // Retroceder 10 seg
  async minusTen(seconds: number = 10) {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          const newPos = Math.max(status.positionMillis - seconds * 1000, 0);
          await currentSound.setPositionAsync(newPos);
          await logInfo(`Retrocediendo ${seconds} seg`);
        }
      }
    } catch (error) {
      await logError('Error al retroceder audio', error);
    }
  },

  // Adelantar 10 seg
  async plusTen(seconds: number = 10) {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded && status.durationMillis) {
          const newPos = Math.min(
            status.positionMillis + seconds * 1000,
            status.durationMillis
          );
          await currentSound.setPositionAsync(newPos);
          await logInfo(`Adelantando ${seconds} seg`);
        }
      }
    } catch (error) {
      await logError('Error al adelantar audio', error);
    }
  },

  // Mover a una posición específica con el slider de progreso
  async certainTime(positionMillis: number) {
    try {
      if (currentSound) {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded) {
          await currentSound.setPositionAsync(positionMillis);
          await logInfo(`Saltando al tiempo : ${positionMillis} ms`);
        }
      }
    } catch (error) {
      await logError('Error al mover tiempo del audio', error);
    }
  },
};
