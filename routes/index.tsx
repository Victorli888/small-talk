import { useSignal } from "@preact/signals";
import ChatHistory, { ChatMessage, PhraseSet } from "../islands/ChatHistory.tsx";
import ChatInput from "../islands/ChatInput.tsx";
import ChatSuggestions from "../islands/ChatSuggestion.tsx";

export default function Home() {
    const messages = useSignal<ChatMessage[]>([]);
    const currentPhraseSet = useSignal<PhraseSet | null>(null);

    const handlePhraseSetFetched = (phraseSet: PhraseSet) => {
        currentPhraseSet.value = phraseSet;
    };

    return (
        <div class="px-4 py-8 mx-auto bg-[#86efac]">
            <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
                <img
                    class="my-6"
                    src="/logo.svg"
                    width="128"
                    height="128"
                    alt="the Fresh logo: a sliced lemon dripping with juice"
                />
                <h1 class="text-4xl font-bold">Let's Make Small Talk</h1>

                {/* Chat Component */}
                <div class="w-full max-w-md mt-8 border rounded-lg shadow-lg">
                    <ChatHistory
                        messages={messages}
                        onPhraseSetFetched={handlePhraseSetFetched}
                    />
                    <ChatInput
                        messages={messages}
                    />
                    <ChatSuggestions
                        messages={messages}
                    />
                </div>
            </div>
        </div>
    );
}