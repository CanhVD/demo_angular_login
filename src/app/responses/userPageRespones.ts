import { User } from "../models/user";

export interface UserPageResponse {
    result: User[],
    total: number
}