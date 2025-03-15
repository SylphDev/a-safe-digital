import { Box, Typography, useTheme } from '@mui/material';

type props = {
  text: string | number;
  border?: boolean;
  align?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  width?: string | number;
  weight?: number;
  size?: string;
};

const Cell = ({
  text,
  border = true,
  width = 'fit-content',
  maxWidth = 'none',
  minWidth = 'auto',
  align = 'center',
  weight = 400,
  size = '12px',
}: props) => {
  const theme = useTheme();
  return (
    <td
      style={{
        textAlign: 'center',
        width: width,
        minWidth: minWidth,
        maxWidth: maxWidth,
        padding: '9px',
        borderRight: border ? `1px solid ${theme.palette.background.paper}` : 'none',
      }}
    >
      <Box
        width={'100%'}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: align,
        }}
      >
        <Typography
          variant="caption"
          fontSize={size}
          color={theme.palette.text.medium}
          fontWeight={weight}
        >
          {text}
        </Typography>
      </Box>
    </td>
  );
};

export default Cell;
