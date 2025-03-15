import { Box, Stack, useTheme } from "@mui/material";
import { Chart, LinearScale, CategoryScale, BarElement, TooltipItem } from "chart.js/auto";
import dynamic from "next/dynamic";

const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), { ssr: false });

Chart.register(LinearScale, CategoryScale, BarElement);

type Props = {
  data: Record<string, number>;
  tooltipLabelCallback?: (tooltipItem: TooltipItem<"bar">) => string;
};

const CustomBarGraph = ({ data, tooltipLabelCallback }: Props) => {
  const theme = useTheme();
  const bgColor: string = "#40c057";

  return (
    <Stack direction="column" width="100%" height="100%">
      <Box style={{ height: "100%", width: "100%" }}>
        <Bar
          data={{
            labels: Object.keys(data),
            datasets: [
              {
                label: "Users by Country",
                data: Object.values(data),
                backgroundColor: bgColor,
                borderColor: bgColor,
                borderWidth: 1,
                borderRadius: 8,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animations: {
              y: {
                duration: 500,
                easing: "linear",
              },
              x: {
                duration: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  title: () => "",
                  label: tooltipLabelCallback || ((tooltipItem) => `Users in ${tooltipItem.label}: ${tooltipItem.raw}`),
                },
                displayColors: false,
              },
            },
            scales: {
              y: {
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
              },
              x: {
                grid: {
                  display: false,
                  drawOnChartArea: false,
                },
                border: {
                  display: false,
                },
                ticks: {
                  color: theme.palette.text.strong,
                },
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default CustomBarGraph;