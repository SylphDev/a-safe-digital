import { useFormContext, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useState } from 'react';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import { Box, useTheme } from '@mui/material';

type Props = TextFieldProps & {
  name: string;
  showButton: boolean;
  id?: string;
  autocomplete?: 'new-password' | 'current-password';
};

const FormPasswordInput = ({
  name,
  showButton,
  id = '',
  autocomplete = 'new-password',
  helperText,
  type,
  ...other
}: Props) => {
  const { control } = useFormContext();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleCopyPasteCut = (e: any) => {
    e.preventDefault();
  };
  const passwordProps = showButton
    ? {
        endAdornment: (
          <InputAdornment position="end">
            {showPassword ? (
              <Visibility
                fontSize="medium"
                sx={{ color: theme.palette.text.light, cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <VisibilityOff
                fontSize="medium"
                sx={{ color: theme.palette.text.light, cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </InputAdornment>
        ),
        autoComplete: autocomplete,
      }
    : {};
  return (
    <Box
      component={'div'}
      sx={{
        width: '100%',
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            id={id}
            variant="standard"
            type={showPassword ? 'text' : 'password'}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            autoComplete={autocomplete}
            inputProps={{
              autoComplete: autocomplete,
              form: {
                autoComplete: autocomplete,
              },
            }}
            InputProps={passwordProps}
            onCopy={handleCopyPasteCut}
            onCut={handleCopyPasteCut}
            onPaste={handleCopyPasteCut}
            {...other}
          />
        )}
      />
    </Box>
  );
};

export { FormPasswordInput };
