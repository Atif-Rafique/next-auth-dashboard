// utils/roles.js

const roles: any = {
    admin: {
        permissions: ['create', 'read', 'update'],
    },
    user: {
        permissions: ['read'],
    },
    guest: {
        permissions: [],
    },
};

export default roles;



