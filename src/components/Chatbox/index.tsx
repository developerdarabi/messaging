
import { useState } from 'react';
import { useAuth } from '../../provider/Auth';
import { useMessage } from '../../provider/Message';
import { useSelectedChat } from '../../provider/SelectedChat';
import { MessageType } from '../../types';
import Messages from '../Messages';
import Container from '../ui/Container';

function ChatBox() {
    const { chat: { messages, chat }, addToMessages } = useSelectedChat()
    const { message, changeMessage } = useMessage()
    const { user } = useAuth()

    const [isLoading, setIsLoading] = useState(false)

    if (!chat || !user) return <Container className="h-full flex items-center justify-center bg-transparent"><h1 className='text-sm font-medium'>Start chating by select one </h1></Container>


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isLoading || message.trim() === '') return

        // Post message to server
        const messageObject: MessageType = { date: new Date().toString(), userId: user._id, message,isUserMessage:true }
        try {
            setIsLoading(true)
            addToMessages(messageObject)

            await fetch('http://localhost:8080/pusher/private', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: chat._id,
                    message: messageObject.message,
                    date:messageObject.date
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
                <Messages messages={messages}/>
            </div>
            <input value={message} onChange={e => changeMessage(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Enter message' />
            <button type='submit' className='bg-indigo-400 rounded-xl w-full p-4 text-white'>Start</button>
        </Container>
    )
}

export default ChatBox
