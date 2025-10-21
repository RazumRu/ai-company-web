/**
 * Configuration index file
 *
 * This file exports the appropriate configuration based on the current environment.
 * It uses the NODE_ENV environment variable to determine which configuration to use.
 */

import * as developmentConfig from './development';
import * as productionConfig from './production';

// Determine which configuration to use based on the environment
const config =
  import.meta.env.MODE === 'production' ? productionConfig : developmentConfig;

// Export all configuration variables
export const {
  API_URL,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_URL,
  KEYCLOAK_REALM,
  STRIPE_PUBLIC_KEY,
  PROJECT_ID,
  WEBSITE_URL,
} = config;
