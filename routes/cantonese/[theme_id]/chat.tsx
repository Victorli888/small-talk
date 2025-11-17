import { PageProps } from "$fresh/server.ts";
import ChatPage from "../../../islands/ChatPage.tsx";

export default function ChatRoute(props: PageProps) {
    const themeId = parseInt(props.params.theme_id);
    
    if (isNaN(themeId)) {
        return (
            <div class="min-h-screen bg-[#86efacff] flex items-center justify-center">
                <div class="text-center">
                    <div class="text-red-600 font-semibold mb-2">Invalid Theme ID</div>
                    <a href="/cantonese/themes" class="text-blue-600 hover:underline">
                        ← Back to Themes
                    </a>
                </div>
            </div>
        );
    }

    return <ChatPage themeId={themeId} />;
}
