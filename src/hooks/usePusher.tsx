import PusherType from "pusher-js/types/src/core/pusher";
import { useEffect, useState } from "react";
import Pusher from 'pusher-js';

export default function usePusher() {

    const [pusher, setPusher] = useState<null | PusherType>(null)

console.log(pusher);

    useEffect(() => {
        if (!pusher) {
            const pusherInstance = new Pusher('eff84010cad346d22491', {
                cluster: 'ap3',
                //@ts-ignore
                encrypted: true,
            });

            setPusher(pusherInstance)

            const channel = pusherInstance.subscribe('my-channel')

            console.log(channel);
            console.log('channel');

            // Bind to an event on the channel
            channel.bind('my-event', (data: any) => {
                console.log('new messageeeeeeee');
                
            });

        }

        // Clean up the subscription when the component unmounts
        return () => {
            pusher?.unsubscribe?.('my-channel');
        };
    }, []);

    return null
}
