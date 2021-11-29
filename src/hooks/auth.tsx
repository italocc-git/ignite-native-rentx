import React, {
    useState,
    useContext,
    createContext,
    ReactNode,
} from 'react'
import api from '../services/api'
import {database} from '../database'
import {User as ModelUser} from '../database/model/User'
interface User { 
    id : string;
    user_id : string;
    name : string;
    email:string;
    driver_license : string;
    photo : string;
    token: string;
}

type SignInCredentials = {
    email: string;
    password : string;
}

interface AuthContextData {
    user : User;
    signIn : (credentials : SignInCredentials) => Promise<void>
    signOut : () => Promise<void>
    updateUser : ( user : User) => Promise<void>
}

type AuthProviderProps = {
    children : ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({children} : AuthProviderProps) {
    const [userData, setUserData] = useState<User>({} as User) 
    
    async function signIn({email , password} : SignInCredentials ){

        try {
            const response = await api.post('/sessions' , {
                email,
                password,
            })
            const {token , user} = response.data
            /* verificar essa linha abaixo */
            api.defaults.headers.common.authorization = `Bearer ${token}`

            const userCollection = database.get<ModelUser>('users')
            await database.write(async () => {
                await userCollection.create((newUser) => {
                    newUser.user_id = user.user_id,
                    newUser.name = user.name,
                    newUser.email = user.email,
                    newUser.driver_license = user.driver_license,
                    newUser.avatar = user.avatar,
                    newUser.token = user.token 
                })
            })
            
            setUserData({
                ...user,
                token 
            })
        }catch(error :any) {
            throw new Error(error)
        }
    }

    async function signOut() {
        try {
            const userCollection = database.get<ModelUser>('users')
            await database.write(async() => {
                const userSelected = await userCollection.find(userData.id)
                await userSelected.destroyPermanently() //Remover do banco local o usuário logado
            })

            setUserData({} as User)
        }catch(error :any) {
            throw new Error(error)
        }
    }

    async function updateUser(user  : User) {
        try {
            const userCollection = database.get<ModelUser>('users');
            await database.write( async () => {
                const userSelected = await userCollection.find(user.id);
                await userSelected.update((userData) => {
                    userData.name = user.name,
                    userData.driver_license = user.driver_license,
                    userData.avatar = user.photo
                })
            })
            setUserData(user)
        
        }catch(error :any) {
            throw new Error(error)
        }
    }

    React.useEffect(() => {
        async function loadLocalUserData() {
            const userCollection = database.get<ModelUser>('users')
            const response = await userCollection.query().fetch()

            if(response.length > 0) { /* Se houver dados armazenados na memória do celular */
                const userData = response[0]._raw as unknown as User; /* Hackizinho p pegar a tipagem no retorno do banco */
                api.defaults.headers.common.authorization = `Bearer ${userData.token}`
                setUserData(userData)
            }
        }
        loadLocalUserData()
    },[])

    return(
        <AuthContext.Provider  value={{signIn , user : userData , signOut , updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() : AuthContextData {
    const context = useContext(AuthContext)

    return context;
}