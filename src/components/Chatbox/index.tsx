
import { useAuth } from '../../provider/Auth';
import { useMessage } from '../../provider/Message';
import { useSelectedChat } from '../../provider/SelectedChat';
import { MessageType } from '../../types';
import { useFetch } from '../../utils/api';
import Messages from '../Messages';
import Container from '../ui/Container';

function ChatBox() {
    const { chat: { messages, chat }, addToMessages } = useSelectedChat()
    const { message, changeMessage } = useMessage()
    const { user } = useAuth()

    if (!chat || !user) return <Container className="h-full flex items-center justify-center bg-transparent"><h1 className='text-sm font-medium'>Start chating by select one </h1></Container>

    const [fetch, { isLoading }] = useFetch()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isLoading || message.trim() === '') return

        // Post message to server
        const messageObject: MessageType = { date: new Date().toString(), userId: user._id, message, isUserMessage: true }

        addToMessages(messageObject)
        await fetch({
            url: 'pusher/private',
            method: 'POST',
            body: {
                userId: chat._id,
                message: messageObject.message,
                date: messageObject.date
            },
            onSuccess: () => {
                changeMessage('')
            }
        })
    };

    return (
        <Container component={'form'} onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold">Start chating</h1>
            <div className='h-[75vh] overflow-auto flex flex-col gap-4'>
                <Messages messages={messages} />
            </div>
            <input value={message} onChange={e => changeMessage(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Enter message' />
            <button type='submit' className='bg-indigo-400 rounded-xl w-full p-4 text-white'>Start</button>
        </Container>
    )
}

export default ChatBox
