import React from "react";

import {
  useJumboSidebarTheme,
  useJumboTheme,
} from "@jumbo/components/JumboTheme/hooks";
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS } from "@jumbo/utilities/constants";
import { Box, Drawer, Toolbar } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import {
  useDrawerVariant,
  useJumboLayout,
  useSidebarDrawerHandlers,
  useSidebarDrawerSx,
} from "../../hooks";
import { SidebarHeader } from "@app/_components/layout/Sidebar/components";

function JumboLayoutDrawer({ children }) {
  const { sidebarTheme } = useJumboSidebarTheme();
  const { theme } = useJumboTheme();
  const { sidebarOptions } = useJumboLayout();

  const { handleClose, handleMouseEnter, handleMouseLeave } =
    useSidebarDrawerHandlers();

  const drawerSx = useSidebarDrawerSx();
  const drawerVariant = useDrawerVariant();
  // const headerSpaceSx = useHeaderSpaceSx();

  const sidebarWithDirectionByMainTheme = React.useMemo(() => {
    return {
      ...sidebarTheme,
      direction: theme.direction,
    };
  }, [theme.direction, sidebarTheme]);

  if (sidebarOptions?.hide) {
    return null;
  }
  // function handleMenuToggle() {
  //   setSidebarOptions({ open: false });
  // }
  return (
    <ThemeProvider theme={sidebarWithDirectionByMainTheme}>
      <Drawer
        sx={drawerSx}
        anchor={sidebarOptions?.anchor}
        open={sidebarOptions?.open}
        variant={drawerVariant}
        transitionDuration={300}
        ModalProps={{
          keepMounted: true,
        }}
        hideBackdrop={sidebarOptions?.variant !== SIDEBAR_VARIANTS.TEMPORARY}
        onClose={handleClose}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            minWidth: 0,
            flexDirection: "column",
            minHeight: "100%",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER && (
            <SidebarHeader />
          )}
          {children}
        </Box>
        {sidebarTheme?.sidebar?.overlay?.bgcolor && (
          <Box
            sx={{
              position: "absolute",
              height: "100%",
              left: 0,
              right: 0,
              top: 0,
              ...(Array.isArray(sidebarTheme.sidebar.overlay.bgcolor) &&
              sidebarTheme.sidebar.overlay.bgcolor.length > 0
                ? {
                    backgroundImage: `linear-gradient(${sidebarTheme.sidebar.overlay.bgcolor[0]}, ${sidebarTheme.sidebar.overlay.bgcolor[1]})`,
                    opacity: sidebarTheme.sidebar.overlay.opacity
                      ? sidebarTheme.sidebar.overlay?.opacity ?? 0.85
                      : 1,
                  }
                : {
                    bgcolor: sidebarTheme.sidebar.overlay.bgcolor,
                    opacity: sidebarTheme.sidebar.overlay?.opacity ?? 1,
                  }),
            }}
          />
        )}
      </Drawer>
    </ThemeProvider>
  );
}

export { JumboLayoutDrawer };
