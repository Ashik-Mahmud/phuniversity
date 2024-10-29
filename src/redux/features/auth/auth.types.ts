

export type TUserRole = 'admin' | 'superAdmin' | 'faculty' | 'student'


export type IUser = {
    userId: string
    role: TUserRole
    iat: number
    exp: number
}





export interface IInitState {
    token: string | null;
    user: IUser | null;
}