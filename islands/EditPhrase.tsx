// islands/EditPhrase.tsx
import { Signal, useSignal } from "@preact/signals";
import { ChatMessage } from "./ChatHistory.tsx";

interface EditPhraseModalProps {
    isOpen: Signal<boolean>;
    messages: Signal<ChatMessage[]>;
}

export default function EditPhraseModal({ isOpen, messages }: EditPhraseModalProps) {
    const formData = useSignal({
        phrase_id: "",
        cantonese: "",
        english: "",
        theme_id: "",
        challenge_rating: "",
        root_question_id: "",
        is_unhide: false
    });

    const status = useSignal({ message: "", isError: false });
    const isLoading = useSignal(false);

    // Fetch phrase data when user clicks the fetch button
    const handleFetchPhrase = async () => {
        if (!formData.value.phrase_id) {
            status.value = { message: "Please enter a phrase ID", isError: true };
            return;
        }

        try {
            isLoading.value = true;
            const response = await fetch(`/api/phrases?id=${formData.value.phrase_id}&include_hidden=true`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch phrase");
            }

            // Update form with fetched data
            formData.value = {
                ...formData.value,
                cantonese: data.cantonese,
                english: data.english,
                theme_id: data.theme_id?.toString() || "",
                challenge_rating: data.challenge_rating?.toString() || "",
                root_question_id: data.root_question_id?.toString() || "",
                is_hidden: data.is_hidden || false
            };

            status.value = { message: "Phrase loaded successfully", isError: false };
        } catch (error) {
            status.value = { message: error.message, isError: true };
        } finally {
            isLoading.value = false;
        }
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (!formData.value.phrase_id) {
            status.value = { message: "Please fetch a phrase first", isError: true };
            return;
        }

        try {
            const response = await fetch("/api/phrases", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phrase_id: parseInt(formData.value.phrase_id),
                    cantonese: formData.value.cantonese,
                    english: formData.value.english,
                    theme_id: formData.value.theme_id ? parseInt(formData.value.theme_id) : undefined,
                    challenge_rating: formData.value.challenge_rating ?
                        parseInt(formData.value.challenge_rating) : undefined,
                    root_question_id: formData.value.root_question_id ?
                        parseInt(formData.value.root_question_id) : undefined
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors?.join(", ") || "Failed to update phrase");
            }

            status.value = { message: "Successfully updated phrase", isError: false };

            // Close modal after success
            setTimeout(() => {
                isOpen.value = false;
            }, 1500);

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
                        <h2 class="text-xl font-bold">Edit Phrase</h2>
                        <button
                            onClick={() => isOpen.value = false}
                            class="text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/*  phrase ID input and fetch */}
                    <div class="mb-4">
                        <div class="flex space-x-2">
                            <input
                                type="number"
                                placeholder="Enter Phrase ID"
                                value={formData.value.phrase_id}
                                onInput={(e) => formData.value = {
                                    ...formData.value,
                                    phrase_id: (e.target as HTMLInputElement).value
                                }}
                                class="flex-1 p-2 border rounded"
                            />
                            <button
                                type="button"
                                onClick={handleFetchPhrase}
                                disabled={isLoading.value}
                                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {isLoading.value ? "Loading..." : "Fetch Phrase"}
                            </button>
                        </div>
                    </div>

                    {/* Rest of the modal content remains the same */}
                    {isLoading.value ? (
                        <div class="flex justify-center items-center py-8">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
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
                                        value={formData.value.cantonese}
                                        onInput={(e) => formData.value = {
                                            ...formData.value,
                                            cantonese: (e.target as HTMLInputElement).value
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
                                        value={formData.value.english}
                                        onInput={(e) => formData.value = {
                                            ...formData.value,
                                            english: (e.target as HTMLInputElement).value
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
                                        value={formData.value.challenge_rating}
                                        onInput={(e) => formData.value = {
                                            ...formData.value,
                                            challenge_rating: (e.target as HTMLInputElement).value
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

                                <div className="flex items-center space-x-2">
                                    <label className="block text-sm font-medium">
                                        Show Phrase
                                    </label>
                                    <input
                                        type="checkbox"
                                        checked={formData.value.is_unhide}
                                        onChange={(e) => formData.value = {
                                            ...formData.value,
                                            is_unhide: (e.target as HTMLInputElement).checked
                                        }}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-500">
                                    (Keep selected to reactivate phrase.)
                                    </span>
                                </div>

                                <div class="flex space-x-3">
                                    <button
                                        type="submit"
                                        class="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    >
                                        Update Phrase
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}