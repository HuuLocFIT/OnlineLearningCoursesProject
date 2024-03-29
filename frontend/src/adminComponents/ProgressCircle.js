import { Box, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  // const theme = useTheme();
  // const angle = progress * 360;
  // return (
  //   <Box
  //     sx={{
  //       background: `radial-gradient(${theme.palette.primary.main} 55%, transparent 56%),
  //           conic-gradient(transparent 0deg ${angle}deg, ${theme.palette.neutral[400]} ${angle}deg 360deg),
  //           ${theme.palette.secondary[400]}`,
  //       borderRadius: "50%",
  //       width: `${size}px`,
  //       height: `${size}px`,
  //     }}
  //   />
  // );
  const theme = useTheme();
  const color =
    progress < 0
      ? theme.palette.redAccent[400]
      : theme.palette.greenAccent[400];

  const angle = Math.abs(progress) * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${theme.palette.primary.main} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${theme.palette.neutral[400]} ${angle}deg 360deg),
            ${color}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
