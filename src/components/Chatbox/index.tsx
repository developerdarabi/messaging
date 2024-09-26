
import { useAuth } from '../../provider/Auth';
import { useMessage } from '../../provider/Message';
import { usePusher } from '../../provider/Pusher';
import { useSelectedChat } from '../../provider/SelectedChat';
import { MessageType } from '../../types';
import { useFetch } from '../../utils/api';
import Messages from '../Messages';
import Container from '../ui/Container';

function ChatBox() {
    const { chat: { messages, chat }, addToMessages,selectChat } = useSelectedChat()
    const { message, changeMessage } = useMessage()
    const { user } = useAuth()

    if (!chat || !user) return <Container className="h-full flex items-center justify-center bg-transparent"><h1 className='text-sm font-medium'>Start chating by select one </h1></Container>

    const [fetch, { isLoading }] = useFetch()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isLoading || message.trim() === '') return

        let contactedUser = chat

        if (!chat.channelId) {
            await fetch({
                url: 'pusher/startChat',
                method: 'POST',
                body: {
                    users: [user._id, chat._id],
                },
                onSuccess: (channel) => {
                    contactedUser = channel
                    selectChat({chat:channel,messages:[]})
                }
            })
        }

        const messageObject: MessageType = { createdAt: new Date().toString(), author: user._id, text: message, isUserMessage: true }
        addToMessages(messageObject)
        await fetch({
            url: 'pusher/private',
            method: 'POST',
            body: {
                userId: contactedUser._id,
                message: messageObject.text,
                channelId: contactedUser.channelId
            },
            onSuccess: () => {
                changeMessage('')
            }
        })

        // Post message to server

    };
    const getIsUserWriteMessage = authorId => authorId === user._id

    return (
        <Container component={'form'} onSubmit={handleSubmit}>
            <div className='h-[75vh] overflow-auto flex flex-col gap-4'>
                <Messages messages={messages} getIsUserWriteMessage={getIsUserWriteMessage}/>
            </div>
            <input value={message} onChange={e => changeMessage(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Enter message' />
            <button type='submit' className='bg-indigo-400 rounded-xl w-full p-4 text-white'>Start</button>
        </Container>
    )
}

export default ChatBox
