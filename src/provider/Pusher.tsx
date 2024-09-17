import Pusher from 'pusher-js';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from './Auth';
import { useSelectedChat } from './SelectedChat';
import Cookies from 'universal-cookie';

const PusherContext = createContext(null);

export const PusherProvider = ({ children }:{children:React.ReactNode}) => {
    const [pusher, setPusher] = useState(null);

    const { addToMessages, chat: { chat } } = useSelectedChat()
    const coockies = new Cookies()
    const { user } = useAuth()

    const isMounted = useRef<boolean>(false)

    var channel

    useEffect(() => {
        if (user) {
            if (!isMounted.current) {
                Pusher.logToConsole = true;
                const pusherInstance = new Pusher('eff84010cad346d22491', {
                    cluster: 'ap3',
                    authEndpoint: 'http://localhost:8080/pusher/auth',
                    auth: {
                        headers:{
                            "Authorization": "Bearer " + coockies.get('token'),
                        },
                    },
                });
                //@ts-ignore
                setPusher(pusherInstance);
                channel = pusherInstance.subscribe(`private-notification-${user._id}`)
                channel.bind('new-message', (message:any) => {
                    console.log('sssssssssssssss');
                    console.log(message);
                    console.log('sssssssssssssss');
                    chat && addToMessages({ ...message, isUserMessage: false })
                })
                isMounted.current = true
            }
        }
        return () => {
            // channel?.unbind('new-message')
            //@ts-ignore
            pusher?.unsubscribe(`private-chat-${user._id}`)
        }
    }, [user,chat]);

    return (
        <PusherContext.Provider value={pusher}>
            {children}
        </PusherContext.Provider>
    );
};

export const usePusher = () => useContext(PusherContext);

export default PusherProvider;