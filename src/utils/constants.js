
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN:    '/auth/login',
    ME:       '/auth/me',
  },

  SESSION: {
    CREATE: '/session/create',
    JOIN:   '/session/join',
    END:    '/session/end',
    LEAVE:  '/session/leave',
    GET:    '/session',       
    LIST:   '/session/list',
  },

  
};

export const ROUTES = {
  HOME:      '/',
  LOGIN:     '/login',
  REGISTER:  '/register',
  DASHBOARD: '/dashboard',
  HOST:      '/host',
  JOIN:      '/join',
};


export const ZEGO_CONFIG = {
  APP_ID:        process.env.REACT_APP_ZEGO_APP_ID,
  SERVER_SECRET: process.env.REACT_APP_ZEGO_SERVER_SECRET || '', 
};



export const APP_CONFIG = {
  // Brand Information
  NAME:        'MyApp',
  TAGLINE:     'Connect, collaborate, and create.',
  VERSION:     process.env.REACT_APP_VERSION || '1.0.0',

  // Environment
  IS_PRODUCTION:  process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',

  // API
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',

  // Session
  SESSION: {
    MAX_PARTICIPANTS: 50,
    DEFAULT_TIMEOUT_MS: 30 * 60 * 1000, 
  },
};