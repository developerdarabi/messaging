import { createContext, ReactNode, useContext, useState } from 'react';
import { UserType } from '../types';


// Define the shape of the MessageContext
interface ContactsContextType {
    contacts: UserType[];
    changeContacts: (contatcs: UserType[]) => void;
}

// Create the MessageContext with the type
const ContactsContext = createContext<ContactsContextType | null>(null);

// MessageProvider Component
export const ContactsProvider = ({ children }: { children: ReactNode }) => {
    const [contacts, setContacts] = useState<UserType[]>([]);

    const changeContacts = (contacts: UserType[]) => setContacts(contacts)

    return (
        <ContactsContext.Provider value={{ contacts, changeContacts }}>
            {children}
        </ContactsContext.Provider>
    );
};

// Custom hook to use the ContactsContext
export const useContacts = (): ContactsContextType => {
    const context = useContext(ContactsContext);
    if (!context) {
        throw new Error('useAuth must be used within an ContactsProvider');
    }
    return context;
};

export default ContactsProvider;
