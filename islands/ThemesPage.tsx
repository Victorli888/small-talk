import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface Situation {
    situation_id: number;
    situation_name: string;
    description: string;
}

export default function ThemesPage() {
    const situations = useSignal<Situation[]>([]);
    const isLoading = useSignal(true);

    useEffect(() => {
        async function fetchSituations() {
            try {
                const response = await fetch('/api/situations');
                if (!response.ok) {
                    throw new Error('Failed to fetch situations');
                }
                const data = await response.json();
                situations.value = data;
                isLoading.value = false;
            } catch (error) {
                console.error('Error fetching situations:', error);
                isLoading.value = false;
            }
        }
        fetchSituations();
    }, []);

    const handleThemeSelect = (themeId: number) => {
        window.location.href = `/cantonese/${themeId}/chat`;
    };

    return (
        <div class="min-h-screen bg-[#86efacff] px-4 py-8">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-8">
                    <img
                        class="mx-auto my-6"
                        src="/SmallTalkLogo.svg"
                        width="200"
                        height="200"
                        alt="Small Talk Logo"
                    />
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">Choose a Theme</h1>
                    <p class="text-gray-600">Select a situation to practice your Cantonese conversation</p>
                </div>

                {isLoading.value ? (
                    <div class="text-center text-gray-500 py-12">
                        Loading themes...
                    </div>
                ) : (
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {situations.value.map((situation) => (
                            <button
                                key={situation.situation_id}
                                onClick={() => handleThemeSelect(situation.situation_id)}
                                class="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer text-left group"
                            >
                                <h3 class="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
                                    {situation.situation_name}
                                </h3>
                                <p class="text-sm text-gray-600 line-clamp-3">
                                    {situation.description}
                                </p>
                                <div class="mt-4 text-blue-600 text-sm font-medium">
                                    Start Practice →
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
