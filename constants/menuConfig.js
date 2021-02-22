import React from 'react';
import { UsergroupAddOutlined, ApartmentOutlined } from '@ant-design/icons';
import { sitePathConfig } from '../constants/sitePathConfig';

const navMenuConfig = [
    {
        label: 'Account Management',
        icon: <UsergroupAddOutlined />,
        children: [
            {
                label: 'Admin',
                ...sitePathConfig.admin
            },
            // {
            //     label: 'Shop Account',
            //     ...sitePathConfig.shopAccount
            // },
            // {
            //     label: 'Customer',
            //     ...sitePathConfig.customer
            // },
        ]
    },
    {
        label: 'Organize',
        icon: <ApartmentOutlined />,
        children: [
            {
                label: 'Organization List',
                ...sitePathConfig.organization
            }
        ]

    },
]

export { navMenuConfig };
