import { Signal, useSignal } from "@preact/signals";
import {ChatMessage} from "./ChatHistory.tsx";

interface AddPhraseModalProps {
    isOpen: Signal<boolean>;
    messages: Signal<ChatMessage[]>;
}

export default function AddPhraseModal({ isOpen, messages }: AddPhraseModalProps) {
    const formData = useSignal({
        chinese_translation: "",
        english_translation: "",
        theme_id: "",
        complexity_rating: "",
        root_question_id: ""
    });

    const status = useSignal({ message: "", isError: false });

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        status.value = { message: "", isError: false };

        try {
            const response = await fetch("/api/phrases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData.value,
                    theme_id: formData.value.theme_id ? parseInt(formData.value.theme_id) : undefined,
                    complexity_rating: formData.value.complexity_rating ?
                        parseInt(formData.value.complexity_rating) : undefined,
                    root_question_id: formData.value.root_question_id ?
                        parseInt(formData.value.root_question_id) : undefined
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors?.join(", ") || "Failed to add phrase");
            }

            status.value = {
                message: `Successfully added phrase with ID: ${data.phrase_id}`,
                isError: false
            };
            formData.value = {
                chinese_translation: "",
                english_translation: "",
                theme_id: "",
                complexity_rating: "",
                root_question_id: ""
            };
        } catch (error) {
            status.value = { message: error.message, isError: true };
        }
    };

    if (!isOpen.value) return null;

    return (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold">Add New Phrase</h2>
                        <button
                            onClick={() => isOpen.value = false}
                            class="text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {status.value.message && (
                        <div class={`p-3 mb-4 rounded ${
                            status.value.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}>
                            {status.value.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">
                                Chinese Translation *
                            </label>
                            <input
                                type="text"
                                value={formData.value.chinese_translation}
                                onInput={(e) => formData.value = {
                                    ...formData.value,
                                    chinese_translation: (e.target as HTMLInputElement).value
                                }}
                                class="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">
                                English Translation *
                            </label>
                            <input
                                type="text"
                                value={formData.value.english_translation}
                                onInput={(e) => formData.value = {
                                    ...formData.value,
                                    english_translation: (e.target as HTMLInputElement).value
                                }}
                                class="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">
                                Theme ID
                            </label>
                            <input
                                type="number"
                                value={formData.value.theme_id}
                                onInput={(e) => formData.value = {
                                    ...formData.value,
                                    theme_id: (e.target as HTMLInputElement).value
                                }}
                                class="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">
                                Complexity Rating (1-5)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={formData.value.complexity_rating}
                                onInput={(e) => formData.value = {
                                    ...formData.value,
                                    complexity_rating: (e.target as HTMLInputElement).value
                                }}
                                class="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium mb-1">
                                Root Question ID (for responses)
                            </label>
                            <input
                                type="number"
                                value={formData.value.root_question_id}
                                onInput={(e) => formData.value = {
                                    ...formData.value,
                                    root_question_id: (e.target as HTMLInputElement).value
                                }}
                                class="w-full p-2 border rounded"
                            />
                        </div>

                        <div class="flex space-x-3">
                            <button
                                type="submit"
                                class="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Add Phrase
                            </button>
                            <button
                                type="button"
                                onClick={() => isOpen.value = false}
                                class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}