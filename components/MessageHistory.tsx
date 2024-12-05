import { Signal } from "@preact/signals";

export interface Message {
    text: string;
    timestamp: string;
}

interface SentMessageProps {
    messages: Signal<Message[]>;
}

export default function MessageHistory({ messages }: SentMessageProps) {
    return (
        <div class="flex flex-col space-y-2 p-4">
            {messages.value.map((message, index) => (
                <div
                    key={index}
                    class="flex justify-end"
                >
                    <div
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-[70%]"
                    >
                        {message.text}
                        <div class="text-xs text-right opacity-70 mt-1">
                            {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}