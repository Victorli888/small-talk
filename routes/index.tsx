import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import MessageHistory, { Message } from "../components/MessageHistory.tsx";
import MessageInput from "../islands/MessageInput.tsx";

export default function Home() {
  const count = useSignal(3);
  const messages = useSignal<Message[]>([]);

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
          <h1 class="text-4xl font-bold">You're Welcome To Small Talk</h1>
          {/*<p class="my-4">*/}
          {/*  Try updating this message in the*/}
          {/*  <code class="mx-2">./routes/index.tsx</code> file, and refresh.*/}
          {/*</p>*/}
          {/*<Counter count={count} />*/}

          {/* Chat Component */}
          <div class="w-full max-w-md mt-8 border rounded-lg shadow-lg">
            <MessageHistory messages={messages} />
            <MessageInput messages={messages} />
          </div>
        </div>
      </div>
  );
}