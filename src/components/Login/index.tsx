import { FormEvent, useState } from 'react';
import { useAuth } from '../../provider/Auth';
import Container from '../ui/Container';

export default function Login() {

    const { login } = useAuth()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLoginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(username,password)

    }

    return (
        <Container component="form" onSubmit={handleLoginUser}>
            <h1 className="text-2xl font-bold">Login</h1>
            <input value={username} onChange={e => setUsername(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Your username' />
            <input value={password} onChange={e => setPassword(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Your password' />
            <button type="submit" className='bg-indigo-400 rounded-xl w-full p-4 text-white'>Login</button>
        </Container>
    )
}
