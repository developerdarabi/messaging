
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import { MessageType, UserType } from '../../types';
import Messages from '../Messages';
import Container from '../ui/Container';

// Initialize Pusher with your credentials
const pusher = new Pusher('eff84010cad346d22491', {
    cluster: 'ap3',
    //@ts-ignore
    encrypted: true,
});

function ChatBox({ user }: { user: UserType }) {
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<null | MessageType[]>(null)

    useEffect(() => {
        // Subscribe to a channel
        const channel = pusher.subscribe('my-channel')
        console.log(channel);

        // Bind to an event on the channel
        channel.bind('my-event', (data: any) => {
            if (data.userId !== user.id) {
                setMessages(prev => [...(prev || []), data])
            }
        });

        // Clean up the subscription when the component unmounts
        return () => {
            pusher.unsubscribe('my-channel');
        };
    }, []);

    const getIsOwnMessage = (userId: string) => userId === user.id

    const handleSubmit = async () => {

        // Post message to server
        const messageObject: MessageType = { date: new Date().toString(), userId: user.id, message }
        try {
            setMessages(prev => [...(prev || []), messageObject])
            await fetch('http://localhost:8080/trigger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channel: 'my-channel',
                    event: 'my-event',
                    data: messageObject,
                }),
            });
            setMessage('')
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <Container>
            <h1 className="text-2xl font-bold">Start chating</h1>
            <div className='h-[70vh] overflow-auto flex flex-col gap-4'>
                <Messages messages={messages} getIsOwnMessage={getIsOwnMessage} />
            </div>
            <input value={message} onChange={e => setMessage(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Enter message' />
            <button onClick={handleSubmit} className='bg-indigo-400 rounded-xl w-full p-4 text-white'>Start</button>
        </Container>
    )
}

export default ChatBox
