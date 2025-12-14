import './styles/global.css';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import { createRoot } from 'react-dom/client';

import App from './App';
import { keycloak } from './auth';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

const _error = console.error;

console.error = function (msg: unknown, ...args: unknown[]) {
  if (!`${msg}`.includes('is deprecated')) {
    _error.apply(console, [msg, ...args]);
  }
};

root.render(
  <ReactKeycloakProvider authClient={keycloak} autoRefreshToken>
    <App />
  </ReactKeycloakProvider>,
);
