export type Role = 'User' | 'Interpretor';

export interface User {
    id?: number,
    role?: Role,
    firstName: string,
    lastName: string,
    email: string,
    password: string
};
