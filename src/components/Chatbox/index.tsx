
import { useState } from 'react';
import { MessageType } from '../../types';
import Messages from '../Messages';
import Container from '../ui/Container';

function ChatBox({ user, message, messages, addToMessages, changeMessage, selectedChat }: any) {
    const [isLoading, setIsLoading] = useState(false)
    // const { pusher } = usePusher({ user })
    // useChannelSubscription({
    //     pusher,
    //     channelName: 'private_'+user._id,
    //     events: {
    //         'message': (data: MessageType) => {
    //             console.log(data);
    //             console.log('aaaaaaaaaaaaaaaaaaa');

    //             if (data.userId !== user?._id) {
    //                 addToMessages(data)
    //             }
    //         }
    //     }
    // })


    const getIsOwnMessage = (userId: string) => userId === user._id

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isLoading || message.trim() === '') return

        // Post message to server
        const messageObject: MessageType = { date: new Date().toString(), userId: user._id, message }
        try {
            setIsLoading(true)
            addToMessages(messageObject)

            await fetch('http://localhost:8080/pusher/private', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: selectedChat._id,
                    message: messageObject.message,
                }),
            });
            changeMessage('')
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <Container component={'form'} onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold">Start chating</h1>
            <div className='h-[70vh] overflow-auto flex flex-col gap-4'>
                <Messages messages={messages} getIsOwnMessage={getIsOwnMessage} />
            </div>
            <input value={message} onChange={e => changeMessage(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Enter message' />
            <button type='submit' className='bg-indigo-400 rounded-xl w-full p-4 text-white'>Start</button>
        </Container>
    )
}

export default ChatBox
