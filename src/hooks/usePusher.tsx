import { useEffect, useState } from "react";

import Pusher from 'pusher-js';
import { UserType } from "../types";



export default function usePusher({ user }: { user: null | UserType }) {

    const [pusher, setPusher] = useState<null | Pusher>(null)

    useEffect(() => {
        if (!pusher && user) {
            const pusherInstance = new Pusher('eff84010cad346d22491', {
                cluster: 'ap3',
                //@ts-ignore
                encrypted: true,
            });

            setPusher(pusherInstance)

        }

        return () => {
            pusher?.disconnect()
        };
    }, [user]);

    return {
        pusher
    }
}
