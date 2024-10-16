import Pusher from 'pusher-js';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { useAuth } from './Auth';
import { useSelectedChat } from './SelectedChat';

const PusherContext = createContext(null);

export const PusherProvider = ({ children }: { children: React.ReactNode }) => {
    const [pusher, setPusher] = useState(null);
    const [channels, setChannels] = useState<null | [{ name: string, channel: any }]>(null);

    const { addToMessages, chat: { chat } } = useSelectedChat()
    const coockies = new Cookies()
    const { user } = useAuth()

    const isMounted = useRef<boolean>(false)


    useEffect(() => {
        if (user) {
            if (!isMounted.current) {
                Pusher.logToConsole = true;
                const pusherInstance = new Pusher('eff84010cad346d22491', {
                    cluster: 'ap3',
                    authEndpoint: 'http://localhost:8080/pusher/auth',
                    auth: {
                        headers: {
                            "Authorization": "Bearer " + coockies.get('token'),
                        },
                    },
                });
                //@ts-ignore
                setPusher(pusherInstance);

                const globalChannel = pusherInstance.subscribe(`presence-app`)
                //@ts-ignore
                setChannels(prev => [...(prev || []), { name: 'global_channel', channel: globalChannel }])
                globalChannel.bind('pusher:member_added', (message: any) => {
                    console.log('user get online');
                    console.log(message);
                    console.log('user get online');
                })

                const notificationsChannel = pusherInstance.subscribe(`private-notification-${user._id}`)
                //@ts-ignore
                setChannels(prev => [...(prev || []), { name: 'notifications_channel', channel: notificationsChannel }])
                notificationsChannel.bind('new-message', (message: any) => {
                    console.log('Notification');
                    console.log(message);
                    console.log('Notification');

                })

                isMounted.current = true
            }
        }
        return () => {
            // channel?.unbind('new-message')
            //@ts-ignore
            pusher?.unsubscribe(`private-chat-${user._id}`)
            //@ts-ignore
            pusher?.unsubscribe(`presence-app`)
            getChannelByName(`private-notification-${user?._id}`)?.channel?.unbind('notifications_channel')
        }
    }, [user]);

    useEffect(() => {
        //@ts-ignore
        if (chat && chat.channelId && user) {
            //@ts-ignore
            const chatChannel = pusher?.subscribe(chat.channelId)
            //@ts-ignore
            setChannels(prev => [...(prev || []), { name: 'chat_channel', channel: chatChannel }])
            chatChannel.bind('new-message', (message: any) => {
                console.log('chatttttttttttttttttttttt');
                console.log(message);
                console.log('chatttttttttttttttttttttt');
                if (message.message.author !== user._id) {
                    addToMessages({ ...message.message, isUserMessage: false })
                }
            })
        }
        return () => {
            //@ts-ignore
            if (chat && chat.channelId && user) {
                //@ts-ignore
                pusher?.unsubscribe(chat.channelId)
                getChannelByName(`chat_channel`)?.channel?.unbind('new-message')
            }
        }
    }, [chat])
    //@ts-ignore
    const subscribeChat = (channel, channelName) => {
        //@ts-ignore
        const notificationsChannel = pusher?.subscribe(channel)
        //@ts-ignore
        setChannels(prev => [...(prev || []), { name: channelName, channel: notificationsChannel }])
    }

    const getChannelByName = (channelName: string) => channels?.find((channel) => channel.name === channelName)

    return (
        //@ts-ignore
        <PusherContext.Provider value={{ pusher, channels, functions: { subscribeChat } }}>
            {children}
        </PusherContext.Provider>
    );
};

export const usePusher = () => useContext(PusherContext);

export default PusherProvider;