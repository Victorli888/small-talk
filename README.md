# Small Talk · 廣東話

An AI-powered Cantonese conversation practice app. Pick a theme, then chat with
an AI tutor that coaches you through real-world Cantonese dialogue — correcting
tone, vocabulary, and phrasing as you go.

## Features

- **AI conversation coaching** — the AI plays a conversation partner and gives
  live feedback on your Cantonese
- **Theme-based practice** — choose from curated topics (greetings, shopping,
  food, etc.)
- **Dark UI** — built for comfortable extended study sessions

## Tech stack

| Layer     | Tech                                                           |
| --------- | -------------------------------------------------------------- |
| Runtime   | [Deno](https://deno.land/)                                     |
| Framework | [Fresh](https://fresh.deno.dev/) (Preact + file-based routing) |
| Styling   | Tailwind CSS + CSS variables                                   |
| AI        | Anthropic Claude API                                           |

## Prerequisites

- [Deno](https://deno.land/manual/getting_started/installation) v1.40+
- An [Anthropic API key](https://console.anthropic.com/)

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Victorli888/small-talk.git
   cd small-talk
   ```

2. Create a `.env` file:
   ```env
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. Start the dev server:
   ```bash
   deno task start
   ```

4. Open [http://localhost:8000](http://localhost:8000) in your browser.

## Usage

1. The app redirects to `/cantonese/themes` — pick a conversation theme.
2. A chat session opens; type your Cantonese and the AI responds with coaching.

## Contributing

1. Fork the repo and create a feature branch.
2. Make your changes and open a pull request.

## License
