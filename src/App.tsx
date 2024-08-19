
import { useState } from 'react';
import ChatBox from './components/Chatbox';
import Login from './components/Login';
import usePusher from './hooks/usePusher';

function App() {
  const [user, setUser] = useState(null)
  usePusher()

  if (!user) return <main className='bg-slate-300 h-screen p-2 flex items-center justify-center w-full'><Login changeUser={(user: any) => setUser(user)} /></main>


  return (
    <main className='bg-slate-300 h-screen p-2 flex items-center justify-center w-full'>
      <ChatBox user={user} />
    </main>
  )
}

export default App
