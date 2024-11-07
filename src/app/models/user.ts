export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    createBy: string;
    updateBy: string;
}