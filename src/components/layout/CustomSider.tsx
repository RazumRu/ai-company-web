import {
  type RefineThemedLayoutV2SiderProps,
  ThemedSiderV2,
} from '@refinedev/antd';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const SIDEBAR_WIDTH = {
  expanded: 200,
  collapsed: 80,
} as const;

const SiderBorderOverlay = ({ collapsed }: { collapsed?: boolean }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 991px)');
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  if (typeof document === 'undefined' || isMobile) {
    return null;
  }

  const borderStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: '1px',
    backgroundColor: 'var(--app-border-color)',
    left: `${collapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded}px`,
    zIndex: 101,
    pointerEvents: 'none',
  };

  return createPortal(<div style={borderStyle} />, document.body);
};

export const CustomSider = (props: RefineThemedLayoutV2SiderProps) => {
  return (
    <ThemedSiderV2
      {...props}
      fixed
      render={({ dashboard, items, collapsed }) => (
        <>
          <SiderBorderOverlay collapsed={collapsed} />
          {dashboard}
          {items}
        </>
      )}
    />
  );
};
