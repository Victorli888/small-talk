import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);color:var(--text);">
        <div style="text-align:center;padding:2rem;">
          <img
            src="/SmallTalkLogo.svg"
            width="80"
            height="80"
            alt="Small Talk logo"
            style="margin:0 auto 1.5rem;"
          />
          <h1 style="font-size:2rem;font-weight:700;margin-bottom:0.5rem;">
            404 - Page not found
          </h1>
          <p style="color:var(--text2);margin-bottom:1.5rem;">
            The page you were looking for doesn't exist.
          </p>
          <a href="/" style="color:var(--purple2);text-decoration:underline;">
            Go back home
          </a>
        </div>
      </div>
    </>
  );
}
