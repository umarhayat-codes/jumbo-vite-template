import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { CardHeader, IconButton } from "@mui/material";
import React from "react";

const SettingHeader = ({ backClickCallback }) => {
  return (
    <CardHeader
      avatar={
        <IconButton
          sx={{ ml: -1.5 }}
          aria-label="back"
          onClick={backClickCallback}
        >
          <ArrowBackIosNewIcon fontSize={"small"} />
        </IconButton>
      }
      title={"Setting"}
      subheader={"Select your preferences"}
    />
  );
};

export { SettingHeader };
