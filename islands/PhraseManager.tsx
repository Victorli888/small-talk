import {Signal, useSignal} from "@preact/signals";
import {ChatMessage, speakerBPhrases} from "./ChatHistory.tsx";
import {useEffect} from "preact/hooks";
import AddPhraseModal from "./AddPhrase.tsx";
import ColoredButton from "../components/ColoredButton.tsx";
import {AddIcon, DeleteIcon, EditIcon} from "../components/ButtonIcons.tsx";

interface ChatInputProps {
    messages: Signal<ChatMessage[]>;
}

export default function PhraseManager({messages}: ChatInputProps) {
    const message = useSignal('');
    const isPhraseManagerOpen = useSignal(false);

    const handleSend = () => {
        if (message.value.trim()) {
            const newMessage = {
                text: message.value,
                timestamp: new Date().toISOString()
            };
            messages.value = [...messages.value, newMessage];
            message.value = '';
        }
    };

    return (
        <>
            <div className="flex justify-center items center space-x-6 p-4 bg-gray-100 border-t">
                <ColoredButton
                    label="Add"
                    onClick={() => isPhraseManagerOpen.value = true}
                    color="green"
                    icon={AddIcon}
                />
                <ColoredButton
                    label="Edit"
                    onClick={() => console.log("Edit Clicked")}
                    color="blue"
                    icon={EditIcon}
                />
                <ColoredButton
                    label="Delete"
                    onClick={() => console.log("Delete Clicked")}
                    color="red"
                    icon={DeleteIcon}
                />
            </div>

            <AddPhraseModal
                isOpen={isPhraseManagerOpen}
                messages={messages}
            />
        </>
    );
}
