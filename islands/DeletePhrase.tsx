// islands/DeletePhrase.tsx
import { Signal, useSignal } from "@preact/signals";
import { ChatMessage } from "./ChatHistory.tsx";

interface DeletePhraseModalProps {
    isOpen: Signal<boolean>;
    messages: Signal<ChatMessage[]>;
}

export default function DeletePhraseModal({ isOpen, messages }: DeletePhraseModalProps) {
    // State management for the component
    const formData = useSignal({
        phrase_id: "",
        chinese_translation: "",
        english_translation: "",
        theme_id: "",
        complexity_rating: "",
        root_question_id: ""
    });

    // Track loading, status messages, and confirmation dialog
    const isLoading = useSignal(false);
    const status = useSignal({ message: "", isError: false });
    const showConfirmation = useSignal(false);

    // Fetch phrase data to display
    const handleFetchPhrase = async () => {
        if (!formData.value.phrase_id) {
            status.value = { message: "Please enter a phrase ID", isError: true };
            return;
        }

        try {
            isLoading.value = true;
            const response = await fetch(`/api/phrases?id=${formData.value.phrase_id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch phrase");
            }

            // Update form with fetched data
            formData.value = {
                ...formData.value,
                chinese_translation: data.chinese_translation,
                english_translation: data.english_translation,
                theme_id: data.theme_id?.toString() || "",
                complexity_rating: data.complexity_rating?.toString() || "",
                root_question_id: data.root_question_id?.toString() || ""
            };

            status.value = { message: "Phrase loaded successfully", isError: false };
            // Reset confirmation dialog when loading new phrase
            showConfirmation.value = false;
        } catch (error) {
            status.value = { message: error.message, isError: true };
        } finally {
            isLoading.value = false;
        }
    };

    const handleDelete = async () => {
        try {
            if (!formData.value.phrase_id) {
                status.value = { message: "No phrase ID provided", isError: true };
                return;
            }

            // Make the delete request using query parameters
            const response = await fetch(`/api/phrases?id=${formData.value.phrase_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            // Parse the response data
            const data = await response.json();

            // Check both the HTTP status and the success flag in the response
            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to delete phrase");
            }

            // Handle successful deletion with a detailed message
            let successMessage = "Phrase successfully hidden";
            if (data.deletedResponses) {
                successMessage += ` along with ${data.responseCount} associated response${data.responseCount > 1 ? 's' : ''}`;
            }

            status.value = {
                message: successMessage,
                isError: false
            };

            // Close modal after success (with a small delay to show the success message)
            setTimeout(() => {
                isOpen.value = false;
            }, 1500);

        } catch (error) {
            console.error('Delete operation error:', error);
            status.value = {
                message: error instanceof Error ? error.message : "Failed to delete phrase",
                isError: true
            };
        }
    };

    // Close confirmation dialog
    const handleCancelDelete = () => {
        showConfirmation.value = false;
    };

    if (!isOpen.value) return null;

    return (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold">Delete Phrase</h2>
                        <button
                            onClick={() => isOpen.value = false}
                            class="text-gray-500 hover:text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Phrase ID input and fetch */}
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

                    {status.value.message && (
                        <div class={`p-3 mb-4 rounded ${
                            status.value.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}>
                            {status.value.message}
                        </div>
                    )}

                    {/* Display phrase details (read-only) */}
                    {formData.value.chinese_translation && (
                        <div class="space-y-4 mb-6">
                            <div>
                                <label class="block text-sm font-medium mb-1">Chinese Translation</label>
                                <div class="w-full p-2 bg-gray-50 border rounded">
                                    {formData.value.chinese_translation}
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-1">English Translation</label>
                                <div class="w-full p-2 bg-gray-50 border rounded">
                                    {formData.value.english_translation}
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-1">Theme ID</label>
                                <div class="w-full p-2 bg-gray-50 border rounded">
                                    {formData.value.theme_id || "None"}
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-1">Complexity Rating</label>
                                <div class="w-full p-2 bg-gray-50 border rounded">
                                    {formData.value.complexity_rating || "None"}
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium mb-1">Root Question ID</label>
                                <div class="w-full p-2 bg-gray-50 border rounded">
                                    {formData.value.root_question_id || "None"}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delete and Cancel buttons */}
                    {formData.value.chinese_translation && !showConfirmation.value && (
                        <div class="flex space-x-3">
                            <button
                                onClick={() => showConfirmation.value = true}
                                class="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                disabled={isLoading.value}
                            >
                                Delete Phrase
                            </button>
                            <button
                                onClick={() => isOpen.value = false}
                                class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    {/* Confirmation dialog */}
                    {showConfirmation.value && (
                        <div class="mt-4">
                            <div class="bg-red-50 text-red-800 p-4 rounded mb-4">
                                <p class="font-medium">Are you sure you want to delete this phrase?</p>
                            </div>
                            <div class="flex space-x-3">
                                <button
                                    onClick={handleDelete}
                                    class="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    disabled={isLoading.value}
                                >
                                    {isLoading.value ? "Deleting..." : "Yes, Delete"}
                                </button>
                                <button
                                    onClick={handleCancelDelete}
                                    class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                                    disabled={isLoading.value}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}