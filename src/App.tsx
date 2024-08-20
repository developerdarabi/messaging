
import { useState } from 'react';
import ChatBox from './components/Chatbox';
import Contacts from './components/Contacts';
import Login from './components/Login';
import Container from './components/ui/Container';
import useChannelSubscription from './hooks/useChannelSubscription';
import usePusher from './hooks/usePusher';
import { MessageType, UserType } from './types';

function App() {
  const [user, setUser] = useState<null | UserType>(null)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<null | MessageType[]>(null)
  const [selectedChat, setSelectedChat] = useState(null)

  const addToMessages = (message: MessageType) => setMessages(prev => [...(prev || []), message])
  const changeMessage = (message: string) => setMessage(message)
  const selectChat = (chat) => {

  }

  const { pusher } = usePusher({ user })
  console.log(user);
  
  useChannelSubscription({
    pusher,
    channelName: 'room1',
    events: {
      'message': (data: MessageType) => {
        if (data.userId !== user?.id) {
          addToMessages(data)
        }
      }
    }
  })

  if (!user) return <main className='bg-slate-300 h-screen p-2 flex items-center justify-center w-full'><Login changeUser={(user: any) => setUser(user)} /></main>

  return (
    <main className='bg-slate-300 h-screen p-6 flex items-center justify-center flex-row gap-4 w-full'>
      <Contacts />
      {
        selectedChat ? (
          <ChatBox
            user={user}
            message={message}
            messages={messages}
            addToMessages={addToMessages}
            changeMessage={changeMessage}
          />
        ) : <Container className="h-full flex items-center justify-center bg-transparent"><h1 className='text-sm font-medium'>Start chating by select one </h1></Container>
      }
    </main>
  )
}
 
export default App
