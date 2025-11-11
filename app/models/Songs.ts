// Modelo: Song
export interface Song {
  id: string;
  title: string;
  artist: string;
  audioFile: any;
  coverImage: any;
  duration?: number;
  willFail?: boolean; // Flag para simular error de reproducción
}

export const songs: Song[] = [
  {
    id: '1',
    title: "Easy Love",
    artist: "Sigala",
    audioFile: require('../../assets/audio/easyLove.mp3'),
    coverImage: require('../../assets/images/easyLoveCover.jpeg'),
    willFail: false,
  },
  {
    id: '2',
    title: "I'm still standing",
    artist: "Elton John",
    audioFile: require('../../assets/audio/standing.mp3'),
    coverImage: require('../../assets/images/standingCover.jpg'),
    willFail: false,
  },
   {
    id: '3',
    title: "Take on me",
    artist: "A-ha",
    audioFile: require('../../assets/audio/takeOn.mp3'),
    coverImage: require('../../assets/images/takeOnCover.jpeg'),
    willFail: false,
  },
  {
    id: '4',
    title: "Thunder",
    artist: "Gabry Ponte, LUM!X, Prezioso",
    audioFile: null,
    coverImage: require('../../assets/images/thunder.jpeg'),
    willFail: false,
  },
];
