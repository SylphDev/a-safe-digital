import { Stack, useTheme } from "@mui/material";
import { CSSProperties } from "react";

type props = {
  page: number;
  totalPages: number;
  onChangePage: any;
};

const ButtonCSS: CSSProperties = {
  fontSize: "14px",
  border: "0px",
  backgroundColor: "transparent",
  cursor: "pointer",
};

const Pagination = ({ page, totalPages, onChangePage }: props) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        width: "100%",
        marginTop: "10px",
      }}
    >
      <button
        style={{
          color: theme.palette.text.medium,
          ...ButtonCSS,
        }}
        className="pagination-button"
        onClick={() => onChangePage(0)}
        disabled={page === 0}
      >
        {"≪"}
      </button>
      <button
        style={{
          color: theme.palette.text.medium,
          ...ButtonCSS,
        }}
        className="pagination-button"
        onClick={() => onChangePage(page - 10)}
        disabled={page <= 9}
      >
        {"<"}
      </button>
      {(page === 0 && totalPages > 5) || (page === 1 && totalPages > 5)
        ? [0, 1, 2, 3, 4].map((p, i) => (
            <button
              key={i}
              onClick={() => onChangePage(p)}
              className="pagination-button"
              disabled={page === p}
              style={{
                color:
                  page === p
                    ? theme.palette.text.green
                    : theme.palette.text.medium,
                ...ButtonCSS,
              }}
            >
              {p + 1}
            </button>
          ))
        : totalPages <= 5
        ? Array.from({ length: totalPages }, (v, i) => i).map((p, i) => (
            <button
              key={i}
              onClick={() => onChangePage(p)}
              className="pagination-button"
              disabled={page === p}
              style={{
                color:
                  page === p
                    ? theme.palette.text.green
                    : theme.palette.text.medium,
                ...ButtonCSS,
              }}
            >
              {p + 1}
            </button>
          ))
        : page > 1 && totalPages > 5 && totalPages - page > 2
        ? [page - 2, page - 1, page, page + 1, page + 2].map((p, i) => (
            <button
              key={i}
              onClick={() => onChangePage(p)}
              className="pagination-button"
              disabled={page === p}
              style={{
                color:
                  page === p
                    ? theme.palette.text.green
                    : theme.palette.text.medium,
                ...ButtonCSS,
              }}
            >
              {p + 1}
            </button>
          ))
        : [
            totalPages - 5,
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
          ].map((p, i) => (
            <button
              key={i}
              onClick={() => onChangePage(p)}
              className="pagination-button"
              disabled={page === p}
              style={{
                color:
                  page === p
                    ? theme.palette.text.green
                    : theme.palette.text.medium,
                ...ButtonCSS,
              }}
            >
              {p + 1}
            </button>
          ))}
      <button
        style={{
          color: theme.palette.text.medium,
          ...ButtonCSS,
        }}
        onClick={() => onChangePage(page + 10)}
        className="pagination-button"
        disabled={page >= totalPages - 10}
      >
        {">"}
      </button>
      <button
        style={{
          color: theme.palette.text.medium,
          ...ButtonCSS,
        }}
        onClick={() => onChangePage(totalPages - 1)}
        className="pagination-button"
        disabled={page === totalPages - 1}
      >
        {"≫"}
      </button>
    </Stack>
  );
};

export default Pagination;
