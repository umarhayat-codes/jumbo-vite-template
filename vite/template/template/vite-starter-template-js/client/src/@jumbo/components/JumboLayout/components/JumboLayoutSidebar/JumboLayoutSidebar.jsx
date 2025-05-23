import { useJumboLayout } from '../../hooks';
import { JumboLayoutAside } from './JumboLayoutAside';
import { JumboLayoutDrawer } from './JumboLayoutDrawer';

export function JumboLayoutSidebar({ children }) {
  const { sidebarOptions } = useJumboLayout();

  if (sidebarOptions.drawer) {
    return <JumboLayoutDrawer>{children}</JumboLayoutDrawer>;
  }
  return <JumboLayoutAside>{children}</JumboLayoutAside>;
}
