import { Signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

export interface Message {
    text: string;
    timestamp: string;
}

interface QuestionPhrase extends Message {
    phrase_id: number;
    chinese_translation: string;
    english_translation: string;
    root_question_id: number | null;
}

interface SentChatProps {
    messages: Signal<Message[]>;
}

export default function ChatHistory({ messages }: SentChatProps) {
    useEffect(() => {
        async function fetchQuestionPhrase() {
            try {
                const response = await fetch('/api/phrases');
                if (!response.ok) {
                    throw new Error('Failed to fetch question phrase');
                }
                const data: QuestionPhrase = await response.json();


                const questionMessage: Message = {
                    text: data.chinese_translation,
                    timestamp: new Date().toISOString()
                };


                messages.value = [questionMessage, ...messages.value];
            } catch (error) {
                console.error('Error fetching question phrase:', error);
            }
        }
        fetchQuestionPhrase();
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