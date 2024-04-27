export interface IUserInterface {
    id?: number,
    username: string,
    email: string,
    isActive?: boolean,
    position: string,
    isChecked?: boolean,
    password: string,
    personalInfo?: IPersonalInfo
}

export interface IPersonalInfo {
    first_name: string,
    last_name: string,
    gender: boolean,
    age: number
}

export default IUserInterface