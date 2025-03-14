import Cookies from 'js-cookie';
import { palette } from './palette';
import { Mode } from 'src/store/slices/settings/types';

// ----------------------------------------------------------------------

export function darkMode(mode: Mode) {
  const theme = {
    palette: palette(mode),
  };

  return theme;
}

export function checkCookiesMode(): Mode {
  const cookiesMode = Cookies.get('theme') as Mode;
  if (cookiesMode) {
    return cookiesMode;
  }
  return 'light';
}

export function changeCookiesMode(mode: Mode): void {
  const cookiesMode = Cookies.get('theme');
  if (cookiesMode) {
    Cookies.remove('theme');
  }
  Cookies.set('theme', mode, { expires: 365 });
}
