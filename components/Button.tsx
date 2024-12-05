import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      // class="px-2 py-1 border-gray-500 border-2 rounded-r-lg bg-blue-500 hover:bg-gray-200 transition-colors"
      class="bg-blue-500 text-white px-5 py-2 rounded-r-lg hover:bg-gray-500"
    />
  );
}
