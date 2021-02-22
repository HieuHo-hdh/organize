const baseHeader = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
}

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data'
}

const apiConfig = {
    file: {
        upload: {
            path: '/v1/file/upload',
            method: 'POST',
            headers: multipartFormHeader
        }
    },
    account: {
        login: {
            path: '/v1/account/login',
            method: 'POST',
            headers: baseHeader
        },
        logout: {
            path: '/v1/account/logout',
            method: 'GET',
            headers: baseHeader
        },
        getAdminProfile: {
            path: '/v1/account/profile',
            method: 'GET',
            headers: baseHeader
        },
        getShopAccountProfile: {
            path: '/v1/shop_account/profile',
            method: 'GET',
            headers: baseHeader
        },
        updateShopAccountProfile: {
            path: '/v1/shop_account/update_profile',
            method: 'PUT',
            headers: baseHeader
        },
        updateProfileAdmin: {
            path: '/v1/account/update_profile_admin',
            method: 'PUT',
            headers: baseHeader
        }
    },
    user: {
        getAdminList: {
            path: '/v1/account/list',
            method: 'GET',
            headers: baseHeader
        },
       
        getAdminById: {
            path: '/v1/account/get',
            method: 'GET',
            headers: baseHeader
        },
        createAdmin: {
            path: '/v1/account/create_admin',
            method: 'POST',
            headers: baseHeader
        },
        updateAdmin: {
            path: '/v1/account/update_admin',
            method: 'PUT',
            headers: baseHeader
        },
        deleteAdmin: {
            path: '/v1/account/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getShopAccountList: {
            path: '/v1/shop_account/list',
            method: 'GET',
            headers: baseHeader
        },
        getShopAccountById: {
            path: '/v1/shop_account/get',
            method: 'GET',
            headers: baseHeader
        },
        createShopAccount: {
            path: '/v1/shop_account/create',
            method: 'POST',
            headers: baseHeader
        },
        updateShopAccount: {
            path: '/v1/shop_account/update',
            method: 'PUT',
            headers: baseHeader
        },
        deleteShopAccount: {
            path: '/v1/shop_account/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        searchShopAccount: {
            path: '/v1/shop_account/autocomplete',
            method: 'GET',
            headers: baseHeader
        },
    },
    groupPermission: {
        getList: {
            path: '/v1/group/list',
            method: 'GET',
            headers: baseHeader
        },
        getPermissionList: {
            path: '/v1/permission/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/group/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/group/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/group/update',
            method: 'PUT',
            headers: baseHeader
        },
        updateStatus: {
            path: '/v1/skills/status',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/skills',
            method: 'DELETE',
            headers: baseHeader
        },
    },
    organize: {
        getOrganizeList: {
            path: '/v1/organize/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/organize/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/organize/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/organize/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/organize/delete',
            method: 'DELETE',
            headers: baseHeader
        },
    }
}

export default apiConfig;
