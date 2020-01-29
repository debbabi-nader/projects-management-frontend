export const SERVER_URL = 'http://localhost:8080/projects-management';

export const API_ENDPOINTS_PREFIX = '/api/v1';
export const AUTH_ENDPOINTS_PREFIX = '/auth';

export const API_BASE_URL = SERVER_URL + API_ENDPOINTS_PREFIX;
export const AUTH_BASE_URL = SERVER_URL + AUTH_ENDPOINTS_PREFIX;

export const API_ENDPOINTS = {
    USERS_RESOURCE_ENDPOINTS: {
        BASE_ENDPOINT: '/users',
    },
    PROJECTS_RESOURCE_ENDPOINTS: {
        BASE_ENDPOINT: '/projects',
        PROJECTS_BY_MANAGER_ENDPOINT: '/projects/manager'
    },
    TASKS_RESOURCE_ENDPOINTS: {
        BASE_ENDPOINT: '/tasks',
        TASKS_BY_PROJECT_ENDPOINT: '/tasks/project'
    }
};

export const AUTH_ENDPOINTS = {
    SIGN_UP_ENDPOINT: '/sign-up',
    SIGN_IN_ENDPOINT: '/sign-in',
    TOKEN_VERIFICATION_ENDPOINT: '/token-verification'
};
