import { ModulesConfig } from '@eui/core';

export const MODULES: ModulesConfig = {
    core: {
        api: {
            base: '/api',
            user: {
                base: '',
                detail: '/user-details',
            },
        },
    },
};
