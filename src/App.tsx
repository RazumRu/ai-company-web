import { Authenticated, AuthProvider, Refine } from '@refinedev/core';

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
} from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from '@refinedev/react-router';
import dataProvider from '@refinedev/simple-rest';
import { App as AntdApp } from 'antd';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { Header } from './components/header';
import { API_URL, PROJECT_ID } from './config';
import { MainPage } from './pages/main/page';
import { GraphPage } from './pages/graphs/details';
import { GraphsListPage } from './pages/graphs/list';
import { createAuthProvider, useAuth } from './auth';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect } from 'react';
import { HomeOutlined, NodeIndexOutlined } from '@ant-design/icons';

// Login page component that redirects to Keycloak
const LoginPage = ({ authProvider }: { authProvider: AuthProvider }) => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (!keycloak.authenticated) {
      authProvider.login({});
    }
  }, [keycloak, authProvider]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      Redirecting to login...
    </div>
  );
};

function App() {
  const { keycloak, initialized } = useAuth();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  const authProvider = createAuthProvider(keycloak);

  return (
    <BrowserRouter>
      <AntdApp>
        <Refine
          dataProvider={dataProvider(API_URL)}
          notificationProvider={useNotificationProvider}
          routerProvider={routerBindings}
          authProvider={authProvider}
          resources={[
            {
              name: 'Dashboard',
              list: '/',
              meta: {
                label: 'Dashboard',
                icon: <HomeOutlined />,
              },
            },
            {
              name: 'Graphs',
              list: '/graphs',
              edit: '/graphs/:id',
              meta: {
                label: 'Graphs',
                icon: <NodeIndexOutlined />,
              },
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: PROJECT_ID,
          }}>
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-inner"
                  fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2
                    Header={Header}
                    Title={({ collapsed }) => (
                      <ThemedTitleV2
                        collapsed={collapsed}
                        wrapperStyles={{
                          height: '32px',
                          gap: '20px',
                        }}
                        icon={
                          <img
                            src="/logo.svg"
                            alt="Logo"
                            style={{
                              width: 32,
                              height: 32,
                              position: 'relative',
                              top: '-2px',
                            }}
                          />
                        }
                        text="AI Company"
                      />
                    )}
                    Sider={(props) => <ThemedSiderV2 {...props} fixed />}>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }>
              <Route index element={<MainPage />} />
              <Route path="/graphs" element={<GraphsListPage />} />
              <Route path="/graphs/:id" element={<GraphPage />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
            <Route
              path="/login"
              element={<LoginPage authProvider={authProvider} />}
            />
          </Routes>

          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </AntdApp>
    </BrowserRouter>
  );
}

export default App;
