import React from "react";

import {
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Popover,
  Tooltip,
} from "@mui/material";
import { Div } from "@jumbo/shared";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { JumboScrollbar } from "@jumbo/components";
import { getArrayElementFromKey } from "@jumbo/utilities/systemHelpers";
import { useSnackbar } from "notistack";

const LabelPopover = ({ labels }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedValues, setSelectedValues] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (!anchorEl) {
      setSelectedValues([]);
    }
  }, [anchorEl]);
  const handleClick = React.useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleChange = React.useCallback(
    (event, isChecked) => {
      const value = event.target.value;
      if (isChecked) {
        if (!selectedValues.includes(value)) {
          setSelectedValues([...selectedValues, value]);
        }
      } else {
        if (selectedValues.includes(value)) {
          const filteredValues = selectedValues.filter(
            (selectedValue) => selectedValue !== value
          );
          setSelectedValues(filteredValues);
        }
      }
    },
    [selectedValues]
  );

  const handleDoneButton = () => {
    handleClose();
    enqueueSnackbar("Labels have been applied successfully.", {
      variant: "success",
    });
  };

  const DoneButton = React.useMemo(() => Button, [Button]);
  return (
    <Div>
      <IconButton>
        <Tooltip title={"Labels"}>
          <LabelOutlinedIcon onClick={handleClick} />
        </Tooltip>
      </IconButton>
      <Popover
        id={"jumbo-checkbox-popover"}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Div>
          <JumboScrollbar autoHeight>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {labels?.map((item) => {
                const id = getArrayElementFromKey(item, "id");
                const label = getArrayElementFromKey(item, "name");
                return (
                  <ListItem key={id} disablePadding>
                    <ListItemButton dense>
                      <ListItemIcon>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedValues.includes(id.toString())}
                              onChange={handleChange}
                              name={`item-${id}`}
                              value={id}
                            />
                          }
                          label={label}
                        />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </JumboScrollbar>
          <Collapse in={selectedValues.length > 0}>
            <DoneButton
              fullWidth
              sx={{ bgcolor: "#EEEEEE" }}
              onClick={handleDoneButton}
            >
              {"Done"}
            </DoneButton>
          </Collapse>
        </Div>
      </Popover>
    </Div>
  );
};

export { LabelPopover };
