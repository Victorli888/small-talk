import { Signal, signal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import { PhraseSet, PhraseData } from "../routes/api/phrases.ts"

export interface ChatMessage {
    text: string;
    timestamp: string;
    isUser?: boolean; // true for user messages, false for bot/other speaker
    english?: string; // optional translation
}

export interface ChatHistoryProps {
    messages: Signal<ChatMessage[]>;
    onPhraseSetFetched?: (phraseSet: PhraseSet) => void;
    themeId?: number | null;
}

export const speakerAPhrase = signal<PhraseData | null>(null);
export const speakerBPhrases = signal<PhraseData[]>([]);

export async function fetchNewPhraseSet(
    messages: Signal<ChatMessage[]>, 
    onPhraseSetFetched?: (phraseSet: PhraseSet) => void,
    themeId?: number | null
) {
    try {
        const url = themeId 
            ? `/api/conversation-data?theme_id=${themeId}`
            : '/api/conversation-data';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch phrase set');
        }
        const data: PhraseSet = await response.json();

        speakerAPhrase.value = data.question;
        speakerBPhrases.value = data.responses;

        // Add bot's question as a message (not from user)
        const questionMessage: ChatMessage = {
            text: data.question.cantonese,
            timestamp: new Date().toISOString(),
            isUser: false,
            english: data.question.english
        };

        messages.value = [...messages.value, questionMessage];

        if (onPhraseSetFetched) {
            onPhraseSetFetched(data);
        }

        console.log(`Successfully fetched new question:`, data.question.cantonese);
        data.responses.forEach((response, i) => {
            console.log(`Successfully fetched response: ${i + 1}`, response.cantonese);
        });
    } catch (error) {
        console.error('Error fetching phrase set:', error);
    }
}

export default function ChatHistory({ messages, onPhraseSetFetched, themeId }: ChatHistoryProps) {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only fetch a phrase set if there are no messages
        if (messages.value.length === 0 && themeId !== null && themeId !== undefined) {
            fetchNewPhraseSet(messages, onPhraseSetFetched, themeId);
        }
    }, [themeId]);

    // Added effect for auto-scrolling
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages.value]);

    return (
        <div
            ref={chatContainerRef}
            class="flex flex-col space-y-3 p-4 h-[400px] overflow-y-auto bg-white"
        >
            {messages.value.length === 0 ? (
                <div class="text-center text-gray-500">
                    Select a situation to start the conversation...
                </div>
            ) : (
                messages.value.map((message, index) => {
                    const isUser = message.isUser ?? (index % 2 === 1);
                    return (
                        <div
                            key={index}
                            class={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                class={`${isUser
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'} 
                                    px-4 py-2 rounded-lg max-w-[70%] cursor-pointer hover:opacity-90 transition-opacity`}
                                title={message.english ? `Translation: ${message.english}` : ''}
                            >
                                <span>{message.text}</span>
                                <div class={`text-xs ${isUser ? 'text-right' : 'text-left'} opacity-70 mt-1`}>
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
