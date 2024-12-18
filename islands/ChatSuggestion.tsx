import { Signal, signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { ChatMessage, speakerBPhrases } from "./ChatHistory.tsx";

interface ChatSuggestionsProps {
    messages: Signal<ChatMessage[]>;
}

export default function ChatSuggestions({ messages }: ChatSuggestionsProps) {
    const responseSuggestions = useSignal<ChatMessage[]>([]);
    const isOpen = signal(true);

    useEffect(() => {
        if (speakerBPhrases.value.length > 0) {
            const suggestionMessages = speakerBPhrases.value.map(response => ({
                text: response.chinese_translation,
                timestamp: new Date().toISOString()
            }));

            responseSuggestions.value = suggestionMessages;
            console.log(`SpeakerB Suggestions: ${speakerBPhrases.value}`);
        }
    }, [speakerBPhrases.value]);

    const handleSuggestionClick = (suggestion: ChatMessage) => {
        messages.value = [...messages.value, suggestion];
    };

    // If no suggestions, don't render anything
    if (responseSuggestions.value.length === 0) return null;

    return (
        <div class="bg-white shadow-md rounded-b-lg border border-gray-200">
            <div
                class="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => isOpen.value = !isOpen.value}
            >
                <h3 class="text-sm font-semibold text-gray-700">
                    {isOpen.value ? 'Hide' : 'Show'} Conversation Suggestions
                </h3>
                {isOpen.value
                    ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><path d="m18 15-6-6-6 6"/></svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
                }
            </div>

            {isOpen.value && (
                <div class="p-4 pt-0">
                    <div>
                        <p class="text-sm font-medium text-gray-600 mb-2">Possible Responses:</p>
                        <div class="flex flex-col overflow-x-auto space-y-2">
                            {responseSuggestions.value.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full whitespace-nowrap hover:bg-blue-200 transition-colors"
                                >
                                    {suggestion.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}