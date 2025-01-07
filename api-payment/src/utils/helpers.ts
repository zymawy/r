type Role = 'admin' | 'user';

const roles: Record<Role, string[]> = {
    admin: ['store', 'view', 'payment'],
    user: ['store', 'view'],
};

export const hasPermission = (role: string, action: string): boolean => {
    if (!Object.keys(roles).includes(role)) {
        return false;
    }

    return roles[role as Role]?.includes(action) ?? false;
};