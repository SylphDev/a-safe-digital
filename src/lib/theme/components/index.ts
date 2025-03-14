import { Theme } from '@mui/material';
import { button } from './button';
import { merge } from 'lodash';
import { textField } from './textfield';
import { typography } from './typography';

export function componentsOverrides(theme: Theme) {
  const components = merge(
    button(theme),
    textField(theme),
    typography(),
  );
  return components;
}
