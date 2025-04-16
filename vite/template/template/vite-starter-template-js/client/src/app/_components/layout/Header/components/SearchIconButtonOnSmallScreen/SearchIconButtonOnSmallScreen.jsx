import { useSmallScreen } from "@app/_hooks";
import { JumboIconButton } from "@jumbo/components/JumboIconButton";
import SearchIcon from "@mui/icons-material/Search";

function SearchIconButtonOnSmallScreen({ onClick }) {
  const smallScreen = useSmallScreen();

  if (!smallScreen) return null;

  return (
    <JumboIconButton elevation={23} onClick={() => onClick(true)}>
      <SearchIcon fontSize={"small"} />
    </JumboIconButton>
  );
}

export { SearchIconButtonOnSmallScreen };
