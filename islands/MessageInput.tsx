import { Signal, useSignal } from "@preact/signals";
import { Message } from "../components/MessageHistory.tsx";

interface MessageInputProps {
    messages: Signal<Message[]>;
}

export default function MessageInput({ messages }: MessageInputProps) {
    const message = useSignal('');

    const handleSend = () => {
        if (message.value.trim()) {
            const newMessage = {
                text: message.value,
                timestamp: new Date().toISOString()
            };
            messages.value = [...messages.value, newMessage];
            message.value = '';
        }
    };

    return (
        <div class="flex p-4 bg-gray-100 border-t">
            <input
                type="text"
                value={message.value}
                onInput={(e) => message.value = e.currentTarget.value}
                placeholder="Type a message..."
                class="flex-grow px-3 py-2 border rounded-l-lg"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSend();
                    }
                }}
            />
            <button
                onClick={handleSend}
                class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
}