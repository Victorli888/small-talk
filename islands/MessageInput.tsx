import { Signal, useSignal } from "@preact/signals";
import { Message } from "./MessageHistory.tsx";
import { Button } from "../components/Button.tsx";

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
            <Button onClick={handleSend}>Send</Button>
        </div>
    );
}