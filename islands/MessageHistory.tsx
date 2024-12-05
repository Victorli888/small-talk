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
        <div class="flex flex-col space-y-2 p-4 min-h-[200px]  bg-white">
            {messages.value.length === 0 ? (
                <div class="text-center text-black-500">
                    No messages yet...
                </div>
            ) : (
                messages.value.map((message, index) => (
                    <div
                        key={index}
                        class="flex justify-end"
                    >
                        <div
                            class="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-[70%]"
                        >
                            <span>{message.text}</span>
                            <div class="text-xs text-right opacity-70 mt-1">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}