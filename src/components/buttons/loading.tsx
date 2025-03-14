import { Button, ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoadingIcon from "../loading-icon";

type props = ButtonProps & {
  loading: boolean;
  text: string;
  onClick?: Function;
};

const LoadingButton = ({
  loading,
  text,
  size,
  type,
  sx,
  onClick = () => {},
  id,
}: props) => {
  const theme = useTheme();
  return (
    <Button
      id={id}
      variant={"contained"}
      size={size}
      disableRipple
      type={type}
      sx={{ width: "100%", fontWeight: 400, fontSize: "16px", ...sx }}
      onClick={onClick}
    >
      {!loading ? (
        text
      ) : (
        <LoadingIcon
          size={1.5}
          border={0.2}
          firstColor={theme.palette.grey[100]}
          secondColor={theme.palette.grey[100]}
        />
      )}
    </Button>
  );
};

export default LoadingButton;
