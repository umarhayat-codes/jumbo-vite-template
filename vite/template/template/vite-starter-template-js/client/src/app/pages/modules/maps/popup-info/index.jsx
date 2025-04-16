import { MapProvider, PopupInfoMap } from "@app/_components/maps";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function PopupInfoMapPage() {
  const { t } = useTranslation();
  return (
    <MapProvider>
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
          {t("modules.title.popupInfoMap")}
        </Typography>
        <PopupInfoMap />
      </Container>
    </MapProvider>
  );
}
