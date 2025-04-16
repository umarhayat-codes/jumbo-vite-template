import { Link, Span } from "@jumbo/shared";

import { getDateElements } from "@app/_utilities/helpers";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const NotificationInvitation = ({ item }) => {
  return (
    <ListItemButton component={"li"} alignItems={"flex-start"}>
      <ListItemAvatar>
        <Avatar src={item.user.profile_pic} />
      </ListItemAvatar>
      <ListItemText>
        <Link underline={"none"} to="#/">
          {item.user.name}
        </Link>{" "}
        has sent you a group invitation for Global Health
        <Typography
          component="span"
          sx={{
            display: "flex",
            fontSize: "90%",
            mt: 0.5,
          }}
        >
          <MarkEmailUnreadOutlinedIcon
            fontSize="small"
            sx={{ color: "#00C4B4" }}
          />
          <Span sx={{ color: "text.secondary", ml: 1 }}>
            {getDateElements(item.date).time}
          </Span>
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export { NotificationInvitation };
