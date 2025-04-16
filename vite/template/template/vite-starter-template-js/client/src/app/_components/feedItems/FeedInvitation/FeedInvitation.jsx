import { Span } from "@jumbo/shared";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const FeedInvitation = ({ feed }) => {
  return (
    <ListItem alignItems={"flex-start"} sx={{ px: 3 }}>
      <ListItemAvatar sx={{ minWidth: 65 }}>
        <Avatar
          sx={{ width: 44, height: 44 }}
          alt={feed.user.name}
          src={feed.metaData?.user?.profile_pic}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant={"h6"} color={"text.secondary"}>
            {feed.timeRange}
          </Typography>
        }
        secondary={
          <Typography component={"div"}>
            <Typography color={"text.primary"} mb={2}>
              <Span sx={{ color: "primary.main" }}>
                {feed.metaData.sender.name}{" "}
              </Span>
              {"has sent you an invitation to join project"}
              <Span sx={{ color: "primary.main" }}>
                {" "}
                {feed.metaData.project.name}
              </Span>
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <Button variant={"contained"} size={"small"} disableElevation>
                Accept
              </Button>
              <Button
                variant={"contained"}
                color={"inherit"}
                size={"small"}
                disableElevation
              >
                Deny
              </Button>
            </Stack>
          </Typography>
        }
      />
    </ListItem>
  );
};

export { FeedInvitation };
