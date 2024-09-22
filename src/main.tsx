import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import AuthProvider from './provider/Auth.tsx'
import MessageProvider from './provider/Message.tsx'
import PusherProvider from './provider/Pusher.tsx'
import SelectedChatProvider from './provider/SelectedChat.tsx'
import ContactsProvider from './provider/contacts.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ContactsProvider>
        <AuthProvider>
          <SelectedChatProvider>
            <MessageProvider>
              <PusherProvider>
                <App />
              </PusherProvider>
            </MessageProvider>
          </SelectedChatProvider>
        </AuthProvider>
      </ContactsProvider>
    </BrowserRouter>
  </StrictMode>,
)
