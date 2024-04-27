
import React, { createContext, useContext, useEffect, useState } from 'react';
import UserJSON from '../../Constant/Users.json'
import { IUserInterface } from "../Interfaces/IUserInterface";
import { getItem } from "../Storage/storage";

const UserContext = createContext<{ users: IUserInterface[], setUsers: React.Dispatch<React.SetStateAction<IUserInterface[]>>}>({
    users: [], setUsers: () => {}
})


export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const userWithCheckbox = UserJSON.map((user: IUserInterface) => ({...user, isChecked: false}))

    const [users, setUsers] = useState<IUserInterface[]>(userWithCheckbox)

    useEffect(() => {
        const userExists = getItem("users")
        if (userExists) {
            const ParseUsers = JSON.parse(userExists).map((user: IUserInterface) => ({...user, isChecked: false}))
            setUsers(ParseUsers)
        }
        else {
            setUsers(userWithCheckbox)
        }
    }, [])
    return (
        <UserContext.Provider value={{users, setUsers}}>{children}</UserContext.Provider>
    )
}

export const useUsers = () => useContext(UserContext)