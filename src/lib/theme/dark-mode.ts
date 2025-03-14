
import { ThemeMode } from '.';
import { palette } from './palette';

export function darkMode(mode: ThemeMode) {
  const theme = {
    palette: palette(mode),
  };

  return theme;
}