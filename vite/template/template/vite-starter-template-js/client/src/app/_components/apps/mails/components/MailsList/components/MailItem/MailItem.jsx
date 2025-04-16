import React from "react";
import {
  Checkbox,
  Collapse,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import ReplyIcon from "@mui/icons-material/Reply";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { MailDetail } from "../../../MailDetail";
import { Div, Span } from "@jumbo/shared";
import moment from "moment";
import { LabelChips } from "@app/_components/apps/common_components";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { ComposeForm } from "../../../MailAppSidebar";

const MailItem = ({ mailItem }) => {
  const { theme } = useJumboTheme();
  const navigate = useNavigate();
  const { showDialog } = useJumboDialog();
  const { labelID } = useParams();
  const [favoriteMail, setFavoriteMail] = React.useState(mailItem.favorite);
  const [showMessage, setShowMessage] = React.useState(false);

  const handleConversationClick = () => {
    setShowMessage(!showMessage);
    navigate(`/apps/mail/message/${mailItem.id}`);
  };

  const handleComposeForm = (mailItem) => {
    showDialog({
      title: "Compose Message",
      content: <ComposeForm mailItem={mailItem} />,
    });
  };
  return (
    <React.Fragment>
      {showMessage && (
        <Collapse in={showMessage}>
          <MailDetail />
        </Collapse>
      )}
      {
        <ListItem
          sx={{
            cursor: "pointer",
            borderTop: 1,
            borderTopColor: "divider",

            "&:hover": {
              bgcolor: "action.hover",

              "& .ListAction": {
                width: { sm: "100%" },
                opacity: { sm: 1 },
              },

              "& .ListTextExtra": {
                visibility: { sm: "hidden" },
                opacity: { sm: 0 },
              },
            },

            "& .MuiListItemIcon-root": {
              minWidth: 48,
            },

            [theme.breakpoints.down("sm")]: {
              flexWrap: "wrap",
            },
          }}
        >
          <Checkbox sx={{ my: -0.5 }} />
          <ListItemIcon sx={{ display: { xs: "none", md: "block" } }}>
            {favoriteMail ? (
              <Tooltip title={"Starred"}>
                <StarIcon
                  fontSize={"small"}
                  sx={{ color: "warning.main" }}
                  onClick={() => setFavoriteMail(!favoriteMail)}
                />
              </Tooltip>
            ) : (
              <Tooltip title={"Not starred"}>
                <StarBorderIcon
                  fontSize={"small"}
                  sx={{ color: "text.secondary" }}
                  onClick={() => setFavoriteMail(!favoriteMail)}
                />
              </Tooltip>
            )}
          </ListItemIcon>
          <ListItemAvatar
            onClick={handleConversationClick}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Avatar
              alt={mailItem?.from?.name}
              src={mailItem?.from?.profile_pic}
            />
          </ListItemAvatar>
          <ListItemText
            onClick={handleConversationClick}
            primary={
              <Typography variant={"body1"} component={"div"}>
                <Typography variant={"h6"}>{mailItem?.from?.name}</Typography>
                <Typography variant={"body1"} color={"text.secondary"} noWrap>
                  {mailItem?.subject}
                </Typography>
              </Typography>
            }
            sx={{ flex: 1 }}
          />
          <Div
            sx={{
              width: 160,
              display: "flex",
              flexShrink: "0",
              position: "relative",
              justifyContent: "flex-end",

              [theme.breakpoints.down("sm")]: {
                width: "100%",
                justifyContent: "space-between",
              },
            }}
          >
            <Div
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 1,
                transition: "all 0.5s ease",

                [theme.breakpoints.down("sm")]: {
                  justifyContent: "flex-start",
                  ml: 6,
                },
              }}
              className={"ListTextExtra"}
            >
              <LabelChips
                labelsArray={mailItem?.labels}
                mapKeys={{ label: "name" }}
                spacing={1}
                size={"small"}
                max={1}
              />
              <Typography variant={"body1"} color={"text.secondary"} ml={1}>
                {moment(mailItem?.date).format("MMMM DD")}
              </Typography>
            </Div>
            <Div
              className="ListAction"
              sx={{
                display: "flex",

                [theme.breakpoints.up("sm")]: {
                  position: "absolute",
                  top: "50%",
                  width: 0,
                  opacity: 0,
                  overflow: "hidden",
                  transition: "all 0.5s ease",
                  justifyContent: "flex-end",
                  transform: "translateY(-50%)",
                },
              }}
            >
              <Span sx={{ height: 36, overflow: "hidden" }}>
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon fontSize={"small"} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Archive"}>
                  <IconButton>
                    <ArchiveIcon fontSize={"small"} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Forward"}>
                  <IconButton onClick={() => handleComposeForm(mailItem)}>
                    <ReplyIcon fontSize={"small"} />
                  </IconButton>
                </Tooltip>
              </Span>
            </Div>
          </Div>
        </ListItem>
      }
    </React.Fragment>
  );
};

export { MailItem };
