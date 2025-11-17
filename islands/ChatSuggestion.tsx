import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { ChatMessage, speakerBPhrases, fetchNewPhraseSet } from "./ChatHistory.tsx";
import { PhraseData } from "../routes/api/phrases.ts";

interface ChatSuggestionsProps {
    messages: Signal<ChatMessage[]>;
    themeId?: number | null;
}

export default function ChatSuggestions({ messages, themeId }: ChatSuggestionsProps) {
    const responsePhrases = useSignal<PhraseData[]>([]);

    useEffect(() => {
        if (speakerBPhrases.value.length > 0) {
            responsePhrases.value = speakerBPhrases.value;
        } else {
            responsePhrases.value = [];
        }
    }, [speakerBPhrases.value]);

    const handleResponseClick = async (response: PhraseData) => {
        // Add the selected response as a user message
        const userMessage: ChatMessage = {
            text: response.cantonese,
            timestamp: new Date().toISOString(),
            isUser: true,
            english: response.english
        };

        messages.value = [...messages.value, userMessage];

        // Clear current suggestions
        responsePhrases.value = [];

        // Fetch new phrase set after a short delay
        setTimeout(() => {
            fetchNewPhraseSet(messages, undefined, themeId ?? null);
        }, 350);
    };

    // If no suggestions, don't render anything
    if (responsePhrases.value.length === 0) return null;

    return (
        <div class="bg-white border-t border-gray-200 p-4">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">Choose your response:</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                {responsePhrases.value.map((response, index) => (
                    <button
                        key={index}
                        onClick={() => handleResponseClick(response)}
                        class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:from-blue-100 hover:to-blue-200 transition-all cursor-pointer text-left shadow-sm hover:shadow-md"
                    >
                        <div class="font-medium text-gray-800 mb-1">
                            {response.cantonese}
                        </div>
                        <div class="text-xs text-gray-600 italic">
                            {response.english}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}