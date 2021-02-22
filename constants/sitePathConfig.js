// import apiConfig from './apiConfig';

export const sitePathConfig = {
    login: {
        path: '/login'
    },
    profile: {
        path: '/profile'
    },
    admin: {
        path: '/admins',
        // permissions: [apiConfig.user.getAdminList.path]
    },
    organization:{
        path: '/organization',
    },
    forbidden: {
        path: '/forbidden',
    }
}