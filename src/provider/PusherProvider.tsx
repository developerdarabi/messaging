import Pusher from 'pusher-js'
import { createContext, useContext, useEffect, useState } from 'react'

const PusherContext = createContext(null)

export default function PusherProvider({ children }: any) {
    const [pusher, setPusher] = useState(null)

    useEffect(() => {
        Pusher.logToConsole = true
        const pusherInstance = new Pusher('eff84010cad346d22491', {
            cluster: 'ap3',
            //@ts-ignore
            encrypted: true,
            authEndpoint: 'http://localhost:8080/pusher/auth',
            auth: {
                headers: {
                    "Authorization": "Bearer YOUR_JWT_TOKEN",
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
