import { FormEvent, useState } from 'react'
import { UserType } from '../../types'
import { idGenerator } from '../../utils'
import Container from '../ui/Container'

export default function Login({ changeUser }: { changeUser: (user: UserType) => void }) {

    const [name, setName] = useState<string>('')

    const handleLoginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (name.trim() === '') {
            alert('Enter name')
            return
        }

        try {
            const data = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name
                }),
            });
            if (!data.ok) {
                throw new Error(data.statusText)
            }
            const response = await data.json()
            changeUser(response.user)
            // setName('')
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <Container component="form" onSubmit={handleLoginUser}>
            <h1 className="text-2xl font-bold">Login</h1>
            <input value={name} onChange={e => setName(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Your name' />
            <button type="submit" className='bg-indigo-400 rounded-xl w-full p-4 text-white'>Login</button>
        </Container>
    )
}
