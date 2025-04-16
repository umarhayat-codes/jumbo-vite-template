import { useJumboConfig } from "@jumbo/components/JumboConfigProvider/hooks";
import { Link as MuiLink } from "@mui/material";
function Link(props) {
  const { LinkComponent } = useJumboConfig();

  return <MuiLink component={LinkComponent} {...props} />;
}

export { Link };
