import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import { Title } from "chart.js";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();

  const colorIncrease = increase > 0 ? theme.palette.greenAccent[400] : theme.palette.redAccent[400]

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: theme.palette.neutral[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: theme.palette.neutral[200] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colorIncrease }}
        >
          {increase > 0? "+" + increase + "%" : increase + "%"}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
