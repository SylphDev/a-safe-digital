import { useFormContext, Controller } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type Props = TextFieldProps & {
  name: string;
  onBlur?: Function;
};

const FormUserInput = ({ name, helperText, type, onBlur, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          variant="standard"
          type={type}
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={(event) => {
            if (type === "number") {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          onBlur={() => {
            if (onBlur) {
              onBlur(field.value);
            }
          }}
          inputProps={{
            autoComplete: "username",
            form: {
              autoComplete: "username",
            },
          }}
          InputProps={{
            autoComplete: "username",
          }}
          {...other}
        />
      )}
    />
  );
};

export { FormUserInput };
