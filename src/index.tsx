import './styles/global.css';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client';

import App from './App';
import { keycloak } from './auth';

// Some dependencies (e.g. json-schema-ref-parser) expect Buffer in the browser.
// Vite doesn't polyfill Node globals by default.
if (!(globalThis as unknown as { Buffer?: unknown }).Buffer) {
  (globalThis as unknown as { Buffer: typeof Buffer }).Buffer = Buffer;
}

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
