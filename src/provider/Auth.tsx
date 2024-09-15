import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { UserType } from '../types';


// Define the shape of the AuthContext
interface AuthContextType {
    user: UserType | null;
    login: (name: string) => Promise<void>;
}

// Create the AuthContext with the type
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "") : null);

    const coockies = new Cookies()
    const navigate = useNavigate();

    const isMounted = useRef(false)

    useEffect(() => {
        if (!isMounted.current) {
            const token = coockies.get('token')
            if (token) {
                getUserInfo(token)
            }
            isMounted.current = true
        }
    }, [])
    console.log(user);
    
    const getUserInfo = async (token: string) => {
        try {
            const response = await fetch('http://localhost:8080/auth/info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            console.log(data);
            
            const loggedInUser: UserType = data.user;
            setUser(loggedInUser);
            return navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    const login = async (username: string, password: String) => {
        if (username.trim() === '') {
            alert('Enter username');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            const loggedInUser: UserType = data.user;
            coockies.set('token', data.token)
            setUser(loggedInUser);
            return navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
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
