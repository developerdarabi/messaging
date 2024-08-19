import { MessageType } from "../../types"

export default function Messages({ messages, getIsOwnMessage }: { messages: null | MessageType[], getIsOwnMessage: (userId: string) => boolean }) {
    if (!messages) return <div className="text-center text-md font-medium">No messages yet</div>

    return messages.map((message: MessageType) => (
        <div key={message.userId}
            className={`
                rounded p-4  w-2/3  
                ${getIsOwnMessage(message.userId) ?
                    'bg-gray-50 me-auto rounded-se-2xl rounded-ss-2xl rounded-ee-2xl'
                    :
                    '  bg-slate-100 ms-auto rounded-es-2xl rounded-se-2xl rounded-ss-2xl'}
                `}
        >
            <h1>{message.message}</h1>
            <span className="text-xs w-fit ms-auto block">{message.date}</span >
        </div>
    ))
}
