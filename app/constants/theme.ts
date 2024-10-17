import { MD3LightTheme as DefaultTheme } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0A3E6C',
    secondary: '#e77d7d',
    scrim: '#005CAFCC',
    error: '#B00020',
    contrastText: '#FFFFFF',
  },
  rouded: {
    small: 10,
    medium: 20,
    large: 30,
  }
};

export default theme;
