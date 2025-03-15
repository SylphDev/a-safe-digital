import { Box, Stack, useTheme } from "@mui/material";
import { Chart, LinearScale, ArcElement, TooltipItem } from "chart.js/auto";
import { Line } from "react-chartjs-2";

Chart.register(LinearScale);
Chart.register(ArcElement);

type props = {
  data: Record<number | string, number>;
  tooltipLabelCallback?: (tooltipItem: TooltipItem<"line">) => string;
};

const CustomLineGraph = ({ data, tooltipLabelCallback }: props) => {
  const theme = useTheme();
  const bgColor: string = "#40c057";

  return (
    <Stack direction={"column"} width={"100%"} height={"100%"}>
      <Box style={{ height: "340px", width: "100%" }}>
        <Line
          id="agesChart"
          data={{
            datasets: [
              {
                label: " ",
                data: Object.values(data),
                fill: true,
                backgroundColor: ({ chart: { ctx } }) => {
                  const colors = {
                    green: {
                      default: "rgba(64, 192, 87, 0.17)",
                      half: "rgba(64, 192, 87, 0.14)",
                      quarter: "rgba(64, 192, 87, 0.10)",
                      zero: "rgba(64, 192, 87, 0.01)",
                    },
                  };
                  const gradient = ctx.createLinearGradient(0, 25, 0, 300);
                  gradient.addColorStop(0, colors.green.default);
                  gradient.addColorStop(0.3, colors.green.half);
                  gradient.addColorStop(0.7, colors.green.quarter);
                  gradient.addColorStop(1, colors.green.zero);
                  return gradient;
                },
                borderColor: bgColor,
                hoverBackgroundColor: bgColor,
                pointBackgroundColor: bgColor,
                borderJoinStyle: "round",
                pointRadius: 3,
                tension: 1,
                cubicInterpolationMode: "monotone",
              },
            ],
            labels: Object.keys(data),
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
            layout: {
              padding: -5,
            },
            plugins: {
              legend: {
                display: false,
                position: "top",
                align: "start",
                labels: {
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  title: () => "",
                  label:
                    tooltipLabelCallback ||
                    ((tooltipItem) => `Value: ${tooltipItem.raw}`),
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

export default CustomLineGraph;
