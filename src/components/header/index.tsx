import { LeftOutlined } from '@ant-design/icons';
import type { RefineThemedLayoutV2HeaderProps } from '@refinedev/antd';
import { useBreadcrumb, useGetIdentity, useLogout } from '@refinedev/core';
import type { MenuProps } from 'antd';
import {
  Avatar,
  Button,
  Dropdown,
  Layout as AntdLayout,
  theme,
  Typography,
} from 'antd';
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  email?: string;
  avatar: string;
};

const getInitials = (value: string) => {
  if (!value) return 'U';
  const [first = '', second = ''] = value.trim().split(' ');
  const initials = `${first.charAt(0)}${second.charAt(0)}`.trim();
  return initials.toUpperCase() || value.charAt(0).toUpperCase() || 'U';
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { breadcrumbs } = useBreadcrumb();
  const { mutate: logout } = useLogout();
  const [profileHover, setProfileHover] = useState(false);
  const location = useLocation();
  const { pathname, search } = location;
  const navigate = useNavigate();

  const pageTitle = useMemo(
    () =>
      breadcrumbs.length
        ? (breadcrumbs[breadcrumbs.length - 1]?.label ?? 'Dashboard')
        : 'Dashboard',
    [breadcrumbs],
  );

  const displayName = user?.name ?? 'Demo User';
  const displayEmail = user?.email ?? 'demo@example.com';
  const profileMenuItems: MenuProps['items'] = [
    { key: 'logout', label: 'Logout' },
  ];

  const handleProfileMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logout();
    }
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px',
    height: '64px',
    borderBottom: '1px solid var(--app-border-color, #E5E7EB)',
  };

  if (sticky) {
    headerStyles.position = 'sticky';
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const hardcodedBackTarget = useMemo((): string | undefined => {
    if (pathname === '/graphs') return '/';
    if (pathname.startsWith('/graphs/')) return '/graphs';

    if (pathname === '/chats') {
      const params = new URLSearchParams(search);
      const graphId = params.get('graphId') ?? undefined;
      return graphId ? `/graphs/${graphId}` : '/graphs';
    }

    return undefined;
  }, [pathname, search]);

  return (
    <AntdLayout.Header style={headerStyles}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {breadcrumbs.length > 1 && (
            <Button
              type="text"
              shape="circle"
              icon={<LeftOutlined />}
              aria-label="Go back"
              style={{
                color: token.colorTextSecondary,
              }}
              onClick={() => {
                if (hardcodedBackTarget) {
                  navigate(hardcodedBackTarget, { replace: true });
                  return;
                }

                navigate('/', { replace: true });
              }}
            />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: token.colorText,
                lineHeight: '18px',
              }}>
              {pageTitle}
            </Text>
            {breadcrumbs.length > 1 && (
              <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                {breadcrumbs
                  .map((crumb) => crumb.label)
                  .filter(Boolean)
                  .join(' / ')}
              </Text>
            )}
          </div>
        </div>

        <Dropdown
          menu={{ items: profileMenuItems, onClick: handleProfileMenuClick }}
          placement="bottomRight"
          arrow={true}
          overlayStyle={{ lineHeight: 'normal' }}
          trigger={['click']}>
          <div
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              height: 48,
              padding: '0 12px',
              borderRadius: 10,
              transition: 'background-color 0.2s ease',
              backgroundColor: profileHover
                ? 'rgba(15, 23, 42, 0.06)'
                : 'transparent',
              cursor: 'pointer',
              userSelect: 'none',
            }}>
            <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
              <Text strong style={{ display: 'block' }}>
                {displayName}
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {displayEmail}
              </Text>
            </div>
            <Avatar src={user?.avatar} alt={displayName} size={40}>
              {!user?.avatar && getInitials(displayName)}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </AntdLayout.Header>
  );
};
