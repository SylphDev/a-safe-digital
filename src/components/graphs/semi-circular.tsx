import { Box, Stack, useTheme } from "@mui/material";
import { Chart, ArcElement, TooltipItem, Tooltip, Legend } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  data: Record<string, number>;
  tooltipLabelCallback?: (tooltipItem: TooltipItem<"doughnut">) => string;
};

const CustomSemiCircularGraph = ({ data, tooltipLabelCallback }: Props) => {
  const theme = useTheme();
  const bgColor: string[] = ["#40c057", "#40c090"];
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "",
        data: Object.values(data),
        backgroundColor: [bgColor[0], bgColor[1]],
        borderColor: [
          theme.palette.background.paper,
          theme.palette.background.paper,
        ],
        borderWidth: 1,
        circumference: 180,
        rotation: -90,
      },
    ],
  };

  return (
    <Stack direction="column" width="100%" height="100%">
      <Box style={{ height: "340px", padding: '20px 0px' }}>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  title: () => "",
                  label:
                    tooltipLabelCallback ||
                    ((tooltipItem) =>
                      `${tooltipItem.label}: ${tooltipItem.raw}`),
                },
                displayColors: false,
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default CustomSemiCircularGraph;
