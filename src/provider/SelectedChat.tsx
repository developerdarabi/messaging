import { createContext, ReactNode, useContext, useState } from 'react';
import { MessageType } from '../types';
import { useFetch } from '../utils/api';


// Define the shape of the MessageContext
interface SelectedChatContextType {
    chat: ChatState;
    changeMessages: (messages: MessageType[]) => void;
    addToMessages: (message: MessageType) => void;
    selectChat: (chat: ChatType, message?: MessageType) => void;
}

interface ChatState {
    chat: ChatType | null
    messages: MessageType[] | null
}

interface ChatType {
    _id: string
}

// Create the MessageContext with the type
const SelectedChatContext = createContext<SelectedChatContextType | null>(null);

// MessageProvider Component
export const SelectedChatProvider = ({ children }: { children: ReactNode }) => {
    const [fetch] = useFetch()
    const [chat, setChat] = useState<ChatState>({
        chat: null,
        messages: null
    })

    const changeMessages = (messages: MessageType[]) => setChat(prev => {
        return { ...prev, messages }
    })
    const addToMessages = (message: MessageType) => setChat(prev => {
        return { ...prev, messages: [...prev.messages || [], message] }
    })
    const selectChat = async (chat: ChatType, messages: any = []) => {
        //@ts-ignore
        if(chat.channelId){
            await fetch({
                //@ts-ignore
                url: 'channels/' + chat.channelId,
                method: 'GET',
                onSuccess: ({messages,...chat}) => {
                    setChat({chat,messages})
                }
            })
            
        }
        else{
            setChat({chat,messages})

        }
    }

    return (
        <SelectedChatContext.Provider value={{ chat, changeMessages, addToMessages, selectChat }}>
            {children}
        </SelectedChatContext.Provider>
    );
};

// Custom hook to use the MessageContext
export const useSelectedChat = (): SelectedChatContextType => {
    const context = useContext(SelectedChatContext);
    if (!context) {
        throw new Error('useAuth must be used within an SelectedChatProvider');
    }
    return context;
};

export default SelectedChatProvider;
