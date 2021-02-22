import {
    STATUS_ACTIVE,
    STATUS_LOCK,
    GroupPermissonTypes,
} from './';

export const groupPermissionTypes = [
    { value: GroupPermissonTypes.ADMIN, label: 'Administrator' },
    { value: GroupPermissonTypes.CUSTOMER, label: 'Customer'}
]

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Active', color: 'green' },
    // { value: STATUS_INACTIVE, label: 'Inactive', color: 'warning' },
    { value: STATUS_LOCK, label: 'Lock', color: 'red' },
]

export const commonLanguages = [
    { value: 'vi', label: 'Việt Nam'},
    { value: 'en', label: 'English'},
    { value: 'de', label: 'German'},
]