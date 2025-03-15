import { Stack, Typography } from "@mui/material";

type props = {
  header: any;
  color: string;
  padding?: string;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  weight?: number;
  size?: string;
};

const TableHeader = ({
  header,
  padding = "15px 9px",
  color,
  align = "center",
  weight = 600,
  size = "12px",
}: props) => {
  return (
    <th>
      <Stack padding={padding} textAlign={align}>
        <Typography
          variant="caption"
          fontSize={size}
          color={color}
          fontWeight={weight}
        >
          {`${header}`}
        </Typography>
      </Stack>
    </th>
  );
};

export default TableHeader;
