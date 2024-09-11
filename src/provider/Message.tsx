import { createContext, ReactNode, useContext, useState } from 'react';


// Define the shape of the MessageContext
interface MessageContextType {
    message: string;
    changeMessage: (message: string) => void;
}

// Create the MessageContext with the type
const MessageContext = createContext<MessageContextType | null>(null);

// MessageProvider Component
export const MessageProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string>('');

    const changeMessage = (message: string) => setMessage(message)

    return (
        <MessageContext.Provider value={{ message, changeMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

// Custom hook to use the MessageContext
export const useMessage = (): MessageContextType => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useAuth must be used within an MessageProvider');
    }
    return context;
};

export default MessageProvider;
