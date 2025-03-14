export const APP_NAME = 'Miles';
export const APP_DESCRIPTION = 'Your personal roadmap to success in tech learning';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  EXPLORE: '/explore',
  COMMUNITY: '/community',
  ROADMAP: '/roadmap',
  SKETCHPAD: '/sketchpad',
};

export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  PROFILE: '/api/profile',
  ROADMAPS: '/api/roadmaps',
  COMMUNITY: '/api/community',
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An internal server error occurred.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  REGISTER_SUCCESS: 'Registration successful!',
  PROFILE_UPDATE: 'Profile updated successfully!',
  ROADMAP_CREATE: 'Roadmap created successfully!',
  ROADMAP_UPDATE: 'Roadmap updated successfully!',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
};

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/milesapp',
  GITHUB: 'https://github.com/milesapp',
  DISCORD: 'https://discord.gg/milesapp',
};

export const META = {
  TITLE_TEMPLATE: '%s | Miles',
  DEFAULT_TITLE: 'Miles - Your Learning Journey',
  DESCRIPTION: APP_DESCRIPTION,
  KEYWORDS: [
    'learning',
    'roadmap',
    'education',
    'tech',
    'programming',
    'development',
  ],
};
