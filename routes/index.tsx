import { useEffect } from "preact/hooks";

export default function Home() {
    useEffect(() => {
        window.location.href = '/cantonese/themes';
    }, []);

    return (
        <div class="min-h-screen bg-[#86efacff] flex items-center justify-center">
            <div class="text-center">
                <div class="text-gray-500">Redirecting...</div>
            </div>
        </div>
    );
}
