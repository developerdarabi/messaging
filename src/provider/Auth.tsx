import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    const login = async (name: string) => {
        if (name.trim() === '') {
            alert('Enter name');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();

            const loggedInUser: UserType = data.user;

            localStorage.setItem('user', JSON.stringify(loggedInUser));
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
