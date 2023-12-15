import { createContext, useEffect, useState, } from "react";

export const UserContext = createContext(); //variable de los datos que queramos

export const UserProvider = ({children}) => {
    const [userList, setUserList] = useState([]);
    const [authenticatedUser, setAuthenticatedUser] = useState(null); // Nuevo estado para el usuario autenticado
    
    useEffect(() => {
        fetch('https://node-db-ff.vercel.app/usersFF')
        .then((responseUser) => responseUser.json())
        .then((dataUser) => {
            setUserList(dataUser);
        })
    }, [])

    return(
        <UserContext.Provider value={{ userList, authenticatedUser, setAuthenticatedUser }}> {/* Pasar tanto la lista de usuarios como el usuario autenticado */}
            {children}
        </UserContext.Provider>
    )
}