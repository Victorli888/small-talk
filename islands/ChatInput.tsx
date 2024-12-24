import { Signal, useSignal } from "@preact/signals";
import { ChatMessage, speakerBPhrases } from "./ChatHistory.tsx";
import { useEffect } from "preact/hooks";

interface ChatInputProps {
    messages: Signal<ChatMessage[]>;
}

export default function ChatInput({ messages }: ChatInputProps) {
    const message = useSignal('');
    const responseSuggestions = useSignal<ChatMessage[]>([]);

    useEffect(() => { }, []);

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
        //     {/* Response Suggestions */}
        //     {responseSuggestions.value.length > 0 && (
        //         <div class="flex overflow-x-auto space-x-2 p-2 bg-gray-50">
        //             {responseSuggestions.value.map((suggestion, index) => (
        //                 <button
        //                     key={index}
        //                     onClick={() => handleSuggestionClick(suggestion)}
        //                     class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full whitespace-nowrap hover:bg-blue-200 transition-colors"
        //                 >
        //                     {suggestion.text}
        //                 </button>
        //             ))}
        //         </div>
        //     )}

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
                    class="bg-blue-500 text-white px-5 py-2 rounded-r-lg hover:bg-blue-500"
                >
                    Send
                </button>
            </div>
    );
}