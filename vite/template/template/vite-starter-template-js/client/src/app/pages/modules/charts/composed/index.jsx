import {
  AxisLabelsComposedChart,
  LineBarAreaComposedChart,
  SameDataComposedChart,
  VerticalComposedChart,
} from "@app/_components/charts/composed";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ComposedChartPage = () => {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Typography variant={"h1"} mb={3}>
        {t("modules.title.composedChart")}
      </Typography>
      <Stack spacing={3}>
        <AxisLabelsComposedChart />
        <VerticalComposedChart />
        <SameDataComposedChart />
        <LineBarAreaComposedChart />
      </Stack>
    </Container>
  );
};

export default ComposedChartPage;
