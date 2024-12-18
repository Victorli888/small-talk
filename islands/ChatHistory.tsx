import { Signal, signal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { PhraseSet, PhraseData } from "../routes/api/phrases.ts"

export interface ChatMessage {
    text: string;
    timestamp: string;
}

export interface ChatHistoryProps {
    messages: Signal<ChatMessage[]>;
    onPhraseSetFetched?: (phraseSet: PhraseSet) => void;
}

// Speaker A  Asks Questions, Speaker B will respond
export const speakerAPhrase = signal<PhraseData | null>(null);
export const speakerBPhrases = signal<PhraseData[]>([]);

export default function ChatHistory({ messages, onPhraseSetFetched }: ChatHistoryProps) {
    useEffect(() => {
        async function fetchPhraseSet() {
            try {
                const response = await fetch('/api/phrases');
                if (!response.ok) {
                    throw new Error('Failed to fetch phrase set');
                }
                const data: PhraseSet = await response.json();

                speakerAPhrase.value = data.question;
                speakerBPhrases.value = data.responses;

                const questionMessage: ChatMessage = {
                    text: data.question.chinese_translation,
                    timestamp: new Date().toISOString()
                };

                messages.value = [questionMessage, ...messages.value];

                if (onPhraseSetFetched) {
                    onPhraseSetFetched(data);
                }

                console.log(`Successfully fetched question:`, data.question.chinese_translation);
                data.responses.forEach((response, i) => {
                    console.log(`Successfully fetched response: ${i + 1}`, response.chinese_translation);
                });
            } catch (error) {
                console.error('Error fetching phrase set:', error);
            }
        }

        // Only fetch a phrase set if there are no messages
        if (messages.value.length === 0) {
            fetchPhraseSet();
        }
    }, []);

    return (
        <div class="flex flex-col space-y-2 p-4 min-h-[200px] bg-white">
            {messages.value.length === 0 ? (
                <div class="text-center text-black-500">
                    No messages yet...
                </div>
            ) : (
                messages.value.map((message, index) => (
                    <div
                        key={index}
                        class={`flex ${index === 0 ? 'justify-start' : 'justify-end'}`}
                    >
                        <div
                            class={`${index === 0
                                ? 'bg-gray-200 text-black'
                                : 'bg-blue-500 text-white'} 
                                px-4 py-2 rounded-lg max-w-[70%]`}
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