import { AuthProvider } from '@refinedev/core';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL } from './config';

// Initialize Keycloak
export const keycloak = new Keycloak({
  clientId: KEYCLOAK_CLIENT_ID,
  url: KEYCLOAK_URL,
  realm: KEYCLOAK_REALM,
});

// Hook to access Keycloak instance and initialized state
export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();
  return { keycloak, initialized };
};

// Auth provider for Refine
export const createAuthProvider = (keycloak: Keycloak): AuthProvider => {
  return {
    login: async () => {
      await keycloak.login({
        redirectUri: window.location.origin,
      });

      return {
        success: false,
        error: new Error('Login failed'),
      };
    },
    logout: async () => {
      try {
        await keycloak.logout({
          redirectUri: window.location.origin,
        });

        return {
          success: true,
          redirectTo: '/login',
        };
      } catch (error) {
        return {
          success: false,
          error: new Error('Logout failed'),
        };
      }
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const { token } = keycloak;

        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
          };
          return {
            authenticated: true,
          };
        } else {
          return {
            authenticated: false,
            logout: true,
            redirectTo: '/login',
            error: {
              message: 'Check failed',
              name: 'Token not found',
            },
          };
        }
      } catch (error) {
        console.error('Authentication check error:', error);
        return {
          authenticated: false,
          logout: true,
          redirectTo: '/login',
          error: {
            message: 'Check failed',
            name: 'Token not found',
          },
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (keycloak?.tokenParsed) {
        return {
          name: keycloak.tokenParsed.name,
          email: keycloak.tokenParsed.email,
          avatar:
            keycloak.tokenParsed.picture ||
            `https://api.dicebear.com/7.x/pixel-art/svg?seed=${keycloak.tokenParsed.name}`,
        };
      }
      return null;
    },
  };
};
