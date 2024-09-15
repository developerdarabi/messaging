import Pusher from 'pusher-js';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const PusherContext = createContext(null)

export default function PusherProvider({ children }: any) {
    const [pusher, setPusher] = useState(null)

    const coockies = new Cookies()

    useEffect(() => {
        Pusher.logToConsole = true
        const pusherInstance = new Pusher('eff84010cad346d22491', {
            cluster: 'ap3',
            //@ts-ignore
            encrypted: true,
            authEndpoint: 'http://localhost:8080/pusher/auth',
            auth: {
                headers: {
                    "Authorization": "Bearer " + coockies.get('token'),
                    "Access-Control-Allow-Origin": "*"
                },
            }
        });
        setPusher(pusherInstance)
    }, [])

    return (
        <PusherContext.Provider value={pusher}>
            {children}
        </PusherContext.Provider>
    )
}

export const usePusher = () => useContext(PusherContext)
