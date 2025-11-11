import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MusicPlayerView from './app/views/MusicPlayerView';
import IndividualSong from './app/views/IndividualSong';
import type { Song } from './app/models/Songs'; 
/*Es un tipo que define todas las pantallas que existen en tu Stack Navigator
y qué parámetros recibe cada una cuando haces navigate() o route.params. */
export type RootStackParamList = {
  MusicPlayer: undefined;
  IndividualSong: { song: Song };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MusicPlayer" component={MusicPlayerView} />
        <Stack.Screen name="IndividualSong" component={IndividualSong} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
