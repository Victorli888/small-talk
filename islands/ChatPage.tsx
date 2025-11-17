import { useSignal } from "@preact/signals";
import ChatHistory, { ChatMessage, PhraseSet } from "./ChatHistory.tsx";
import PhraseManager from "./PhraseManager.tsx";
import ChatSuggestions from "./ChatSuggestion.tsx";

interface ChatPageProps {
    themeId: number;
}

export default function ChatPage({ themeId }: ChatPageProps) {
    const messages = useSignal<ChatMessage[]>([]);
    const currentPhraseSet = useSignal<PhraseSet | null>(null);

    const handlePhraseSetFetched = (phraseSet: PhraseSet) => {
        currentPhraseSet.value = phraseSet;
    };

    const handleBackToThemes = () => {
        window.location.href = '/cantonese/themes';
    };

    return (
        <div class="min-h-screen bg-[#86efacff] px-4 py-8">
            <div class="max-w-4xl mx-auto">
                <div class="mb-6 flex items-center justify-between">
                    <button
                        onClick={handleBackToThemes}
                        class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                    >
                        ← Back to Themes
                    </button>
                </div>

                <div class="bg-white border rounded-lg shadow-lg">
                    <div class="p-4 border-b bg-gray-50">
                        <h2 class="text-xl font-semibold text-gray-800">Practice Conversation</h2>
                    </div>

                    <ChatHistory
                        messages={messages}
                        onPhraseSetFetched={handlePhraseSetFetched}
                        situationId={themeId}
                    />

                    <ChatSuggestions
                        messages={messages}
                        situationId={themeId}
                    />

                    <PhraseManager
                        messages={messages}
                    />
                </div>
            </div>
        </div>
    );
}
