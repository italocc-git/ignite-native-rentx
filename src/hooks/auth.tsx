import React, {
    useState,
    useContext,
    createContext,
    ReactNode,
} from 'react'
import api from '../services/api'

interface User { 
    id : string;
    name : string;
    email:string;
    driver_license : string;
    photo : string;
}

interface AuthState {
    token : string;
    user : User;
}

type SignInCredentials = {
    email: string;
    password : string;
}

interface AuthContextData {
    user : User;
    signIn : (credentials : SignInCredentials) => Promise<void>
}

type AuthProviderProps = {
    children : ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({children} : AuthProviderProps) {
    const [userData, setUserData] = useState({} as AuthState) 
    
    async function signIn({email , password} : SignInCredentials ){

        const response = await api.post('/sessions' , {
            email,
            password,
        })
        const {token , user} = response.data
        /* verificar essa linha abaixo */
        api.defaults.headers.common.authorization = `Bearer ${token}`
        
        setUserData({
            user,
            token 
        })
    }

    return(
        <AuthContext.Provider  value={{signIn , user : userData.user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() : AuthContextData {
    const context = useContext(AuthContext)

    return context;
}