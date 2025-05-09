import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { JumboCard } from "@jumbo/components";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

const Contacts = () => {
  const {userData} = useAuth()
  return (
    <JumboCard title={"Contact"}>
      <List disablePadding sx={{ mb: 2 }}>
        <ListItem
          alignItems="flex-start"
          sx={{ p: (theme) => theme.spacing(0.5, 3) }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
            <EmailOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="text.secondary">
                Email
              </Typography>
            }
            secondary={
              <Link variant="body1" href="#" underline="none">
                {userData.email}
              </Link>
            }
          />
        </ListItem>
        <ListItem
          alignItems="flex-start"
          sx={{ p: (theme) => theme.spacing(0.5, 3) }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
            <InsertLinkOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="text.secondary">
                Web page
              </Typography>
            }
            secondary={
              <Link variant="body1" href="#" underline="none">
                example.com
              </Link>
            }
          />
        </ListItem>
        <ListItem
          alignItems="flex-start"
          sx={{ p: (theme) => theme.spacing(0.5, 3) }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
            <LocalPhoneOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="text.secondary">
                Phone
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary">
                +1-987 (454) 987
              </Typography>
            }
          />
        </ListItem>
      </List>
    </JumboCard>
  );
};

export { Contacts };
