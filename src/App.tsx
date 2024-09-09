
import { useEffect, useState } from 'react';
import ChatBox from './components/Chatbox';
import Contacts from './components/Contacts';
import Container from './components/ui/Container';
import { usePusher } from './provider/PusherProvider';
import { MessageType } from './types';

function App() {
  // const [user, setUser] = useState<null | UserType>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "") : null)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<null | MessageType[]>(null)
  const [selectedChat, setSelectedChat] = useState(null)

  const addToMessages = (message: MessageType) => setMessages(prev => [...(prev || []), message])
  const changeMessage = (message: string) => setMessage(message)
  const selectChat = (chat: any) => setSelectedChat(chat)

  const pusher = usePusher()

  const user = JSON.parse(localStorage.getItem('user') || "")

  console.log(user);

  useEffect(() => {
    if (pusher) {
      const channel = pusher.subscribe(`private-chat-${user._id}`)
      channel?.bind('new-message', (data: any) => {
        console.log('ssssssssssssssssssssssssssssssssssss');
        console.log(data);
        console.log('ssssssssssssssssssssssssssssssssssss');
        //@ts-ignore
        addToMessages(data)
      })

    }

    return () => {
      pusher?.unsubscribe(`private-user-${user._id}`);
    };


  }, [pusher])

  // if (!localStorage.getItem('user')) return <main className='bg-slate-300 h-screen p-2 flex items-center justify-center w-full'><Login changeUser={(user: any) => setUser(user)} /></main>

  return (
    <main className='bg-slate-300 h-screen p-6 flex items-center justify-center flex-row gap-4 w-full'>
      <Contacts selectChat={selectChat} />
      {
        selectedChat ? (
          <ChatBox
            user={user}
            message={message}
            messages={messages}
            addToMessages={addToMessages}
            changeMessage={changeMessage}
            selectedChat={selectedChat}
          />
        ) : <Container className="h-full flex items-center justify-center bg-transparent"><h1 className='text-sm font-medium'>Start chating by select one </h1></Container>
      }
    </main>
  )
}

export default App
