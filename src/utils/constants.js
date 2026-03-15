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
  PRIVACY:   '/privacy',
  TERMS:     '/terms',
  CONTACT:   '/contact',
};

export const ZEGO_CONFIG = {
  APP_ID:        process.env.REACT_APP_ZEGO_APP_ID,
  SERVER_SECRET: process.env.REACT_APP_ZEGO_SERVER_SECRET || '', 
};



export const APP_CONFIG = {
  // Brand
  NAME:        'LiveClass',
  TAGLINE:     'Connect, collaborate, and create.',
  DESCRIPTION: 'Connect, collaborate, and create with LiveClass — your go-to platform for seamless live sessions.',
  VERSION:     process.env.REACT_APP_VERSION || '1.0.0',

  // Environment
  IS_PRODUCTION:  process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',

  // API
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',

  // Session limits
  SESSION: {
    MAX_PARTICIPANTS:    50,
    DEFAULT_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
  },
};


export const SOCIAL_LINKS = {
  GITHUB:   'https://github.com/yourusername',
  TWITTER:  'https://twitter.com/yourusername',
  LINKEDIN: 'https://www.linkedin.com/in/yourusername/',
};



export const COPYRIGHT_TEXT = `© ${new Date().getFullYear()} ${APP_CONFIG.NAME}. All rights reserved.`;

export const FOOTER_LINKS = [
  { name: 'Privacy Policy',   url: ROUTES.PRIVACY },
  { name: 'Terms of Service', url: ROUTES.TERMS   },
  { name: 'Contact Us',       url: ROUTES.CONTACT },
];


export const HOME_PAGE_CONTENT = {
  WELCOME_MESSAGE: `Welcome to ${APP_CONFIG.NAME} — Your Ultimate Live Session Platform`,

  FEATURES: [
    'Host and join live sessions with ease',
    'Real-time video and audio communication',
    'Screen sharing and interactive tools',
    'Secure and reliable platform',
    'User-friendly interface',
  ],

  CALL_TO_ACTION: 'Get started now and experience the future of live sessions!',
};



export const BENEFITS_DATA = [
  {
    title:       'Seamless Connectivity',
    description: 'Connect with anyone, anywhere, anytime with our robust and reliable platform.',
  },
  {
    title:       'Interactive Tools',
    description: 'Engage your audience with real-time chat, polls, and collaborative whiteboards.',
  },
  {
    title:       'High-Quality Streaming',
    description: 'Experience crystal-clear video and audio quality for an immersive session.',
  },
  {
    title:       'Secure and Private',
    description: 'Your privacy is our priority. We use end-to-end encryption to protect your data.',
  },
  {
    title:       'User-Friendly Interface',
    description: 'Our intuitive design makes it easy for anyone to host or join a session without any technical hassle.',
  },
];



export const DASHBOARD_CONTENT = {
  WELCOME_MESSAGE:   'Welcome back, {name}!',
  CREATE_SESSION:    'Create a new live session and invite your friends or colleagues to join.',
  JOIN_SESSION:      'Join an existing session using a unique session ID provided by the host.',
  UPCOMING_SESSIONS: 'Here are your upcoming sessions. Click on any session to view details or join.',
  NO_SESSIONS:       'You have no upcoming sessions. Create one now and start connecting!',
};



export const AUTH_CONTENT = {
  LOGIN: {
    TITLE:                'Welcome Back!',
    DESCRIPTION:          'Log in to your account to access your dashboard and manage your sessions.',
    EMAIL_PLACEHOLDER:    'Enter your email',
    PASSWORD_PLACEHOLDER: 'Enter your password',
    SUBMIT_BUTTON:        'Log In',
    NO_ACCOUNT:           "Don't have an account? ",
    REGISTER_LINK:        'Register here',
  },

  REGISTER: {
    TITLE:                'Join LiveClass Today!',
    DESCRIPTION:          'Create an account to host and join live sessions with ease.',
    NAME_PLACEHOLDER:     'Enter your name',
    EMAIL_PLACEHOLDER:    'Enter your email',
    PASSWORD_PLACEHOLDER: 'Create a password',
    SUBMIT_BUTTON:        'Register',
    HAVE_ACCOUNT:         'Already have an account? ',
    LOGIN_LINK:           'Log in here',
  },
};

export const LOADING_MESSAGES = [
  'Setting up your live session...',
  'Connecting to the server...',
  'Almost there, just a moment...',
  'Finalizing the setup...',
  'Getting everything ready for you...',
];