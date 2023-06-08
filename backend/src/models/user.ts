export interface User {
    id: number;
    firstname: string;
    lastname: string;
    avatar: string | null;
    email: string;
    password: string;
    admin: boolean;
}

export interface UserRes {
    id: number;
    firstname: string;
    lastname: string;
    avatar: string | null;
    email: string;
    admin: boolean;
}