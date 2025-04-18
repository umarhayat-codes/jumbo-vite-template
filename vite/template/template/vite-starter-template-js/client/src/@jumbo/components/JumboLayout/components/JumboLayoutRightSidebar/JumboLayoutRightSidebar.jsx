import { useJumboLayout } from '../../hooks';
import { JumboLayoutDrawer } from '../JumboLayoutSidebar/JumboLayoutDrawer';
import { JumboLayoutRside } from './JumboLayoutRside';

export function JumboLayoutRightSidebar({ children }) {
  const { rightSidebarOptions } = useJumboLayout();

  if (rightSidebarOptions?.drawer) {
    return <JumboLayoutDrawer>{children}</JumboLayoutDrawer>;
  }
  return <JumboLayoutRside>{children}</JumboLayoutRside>;
}
