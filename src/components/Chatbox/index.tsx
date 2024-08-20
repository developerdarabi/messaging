
import { MessageType, UserType } from '../../types';
import Messages from '../Messages';
import Container from '../ui/Container';


function ChatBox({ user, message, messages, addToMessages, changeMessage }: { user: UserType, message: string, messages: null | MessageType[], addToMessages: (message: MessageType) => void, changeMessage: (message: string) => void, }) {

    const getIsOwnMessage = (userId: string) => userId === user.id

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Post message to server
        const messageObject: MessageType = { date: new Date().toString(), userId: user.id, message }
        try {
            addToMessages(messageObject)
            await fetch('http://localhost:8080/trigger', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channel: 'room1',
                    event: 'message',
                    data: messageObject,
                }),
            });
            changeMessage('')
        } catch (error) {
            console.log(error);

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
