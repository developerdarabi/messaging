import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { UserType } from '../types';
import { useFetch } from '../utils/api';


// Define the shape of the AuthContext
interface AuthContextType {
    user: UserType | null;
    login: (username: string, password: string) => Promise<void>;
}

// Create the AuthContext with the type
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "") : null);

    const cookies = new Cookies()
    const navigate = useNavigate();

    const isMounted = useRef(false)

    const [fetch] = useFetch()

    useEffect(() => {
        if (!isMounted.current) {
            const token = cookies.get('token')
            if (token) {
                getUserInfo()
            }
            isMounted.current = true
        }
    }, [])

    const getUserInfo = async () => {
        await fetch({
            url: 'auth/info',
            onSuccess: (response) => {
                const loggedInUser: UserType = response.user;
                setUser(loggedInUser);
                return navigate("/");
            }
        })
    }

    const login = async (username: string, password: String) => {
        if (username.trim() === '') {
            alert('Enter username');
            return;
        }
        await fetch({
            url: 'auth',
            body: { username, password },
            onSuccess: (response) => {
                const loggedInUser: UserType = response.user;
                cookies.set('token', response.token)
                setUser(loggedInUser);
                return navigate("/");
            }
        })
    };

    return (
        //@ts-ignore
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
