// App.js
import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { LightTheme, DarkTheme } from './src/styles/themes';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = useMemo(() => (isDarkTheme ? DarkTheme : LightTheme), [isDarkTheme]);

  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
