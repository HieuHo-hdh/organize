const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    contentRootUrl: `${process.env.REACT_APP_API}/v1/file/download`,
    langKey: 'vi'
};

const StorageKeys = {
    userData: 'hqtech-user-data'
}

const LayoutConfigs = {
    NAV_WIDTH_EXPANDED: 220,
    NAV_WIDTH_COLLAPSED: 80
}

const UserTypes = {
    ADMIN: 1,
    SHOP: 2
}

const GroupPermissonTypes = {
    ADMIN: 1,
    CUSTOMER: 2
}

const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO'
}


// Pagination config
export const DEFAULT_TABLE_ITEM_SIZE = 10;
export const DATE_FORMAT_DISPLAY = 'DD-MM-YYYY';
export const DATE_FORMAT_VALUE = 'DD/MM/YYYY';
export const TIME_FORMAT_DISPLAY = 'HH:mm';

// Common status
export const STATUS_INACTIVE = 0;
export const STATUS_ACTIVE = 1;
export const STATUS_LOCK = -1;
export const STATUS_DELETE = -2;



export {
    AppConstants,
    StorageKeys,
    LayoutConfigs,
    UserTypes,
    GroupPermissonTypes,
    UploadFileTypes
};
