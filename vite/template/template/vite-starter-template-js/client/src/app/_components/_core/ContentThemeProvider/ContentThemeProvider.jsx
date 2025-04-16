import {
  JumboThemeHeader,
  JumboThemeSidebar,
} from "@jumbo/components/JumboTheme/components";
import {
  useJumboHeaderTheme,
  useJumboSidebarTheme,
  useJumboTheme,
} from "@jumbo/components/JumboTheme/hooks";
import React from "react";

function ThemeWrapper({ children }) {
  const { theme } = useJumboTheme();
  const { setSidebarTheme } = useJumboSidebarTheme();
  const { setHeaderTheme } = useJumboHeaderTheme();

  React.useEffect(() => {
    setSidebarTheme(theme);
    setHeaderTheme(theme);
  }, [theme?.type]);
  return children;
}

export function ContentThemeProvider({ children }) {
  const { theme } = useJumboTheme();
  return (
    <JumboThemeSidebar init={theme}>
      <JumboThemeHeader init={theme}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </JumboThemeHeader>
    </JumboThemeSidebar>
  );
}
