# Claude Code Prompt — Cantonese Language Learning App

## What You Are Building

A web-based Cantonese language learning app. The user selects a conversation theme, then
practices with an AI that acts as a native Cantonese speaker. The app calls the Anthropic API
directly from the frontend. There is no backend server and no database.

The full system prompt and all 14 theme prompts are in `smalltalk_rewrite_prompt.md` in this
project. Read that file first before writing any code.

---

## Tech Stack

- Deno/DenoFresh
- Tailwind CSS for utility classes only — no component libraries
- Anthropic API via `fetch` to `https://api.anthropic.com/v1/messages`
- No backend, no database, no auth

---

## Colour Scheme

Dark theme only. Use these exact CSS variables throughout:

```css
--bg:           #0a0a12   /* page background */
--bg2:          #10101e   /* header / footer */
--bg3:          #16162a   /* cards, panels */
--bg4:          #1e1e35   /* hover states */
--border:       rgba(120,100,255,0.15)
--border2:      rgba(120,100,255,0.28)
--purple:       #7c5cfc
--purple2:      #9d7fff
--blue:         #3b5bdb
--blue2:        #5c7cfa
--accent:       #b197fc
--text:         #e8e6ff
--text2:        #a098c8
--text3:        #6b6490
--user-bubble:  #1e1a3a   /* user chat bubble background */
--user-border:  rgba(124,92,252,0.4)
--ai-bubble:    #131326   /* AI chat bubble background */
--ai-border:    rgba(59,91,219,0.35)
--green:        #40c057
--yellow:       #ffd43b
--red:          #fa5252
```

---

## App Structure — Two Screens

### Screen 1: Theme Selection

- Full-page grid of theme cards
- Header: small badge reading "廣東話 · Cantonese", title "Choose a Topic", subtitle
  "Select a theme to start your conversation practice"
- Grid: 2–3 columns responsive, one card per theme
- Each card shows: an emoji icon, the theme name in English, a one-line description
- On card click → navigate to Screen 2 with the selected theme

Use these 14 themes (icon, name, description):

| Icon | Name | Description |
|------|------|-------------|
| 👤 | Personal Identity | Name, background, family, occupation |
| 🌅 | Daily Routines | Schedules, habits, typical day |
| 🍜 | Food & Dining | Ordering, preferences, restaurants |
| 🗺️ | Directions | Navigation, transport, landmarks |
| 🛍️ | Shopping | Prices, bargaining, transactions |
| 💬 | Small Talk | Greetings, opinions, casual chat |
| 🏥 | Health | Symptoms, doctor, pharmacy |
| 💼 | Work | Meetings, tasks, workplace |
| 🎮 | Leisure | Hobbies, movies, weekend plans |
| ✈️ | Travel | Hotels, airports, tourism |
| ❤️ | Relationships | Friends, emotions, feelings |
| 🔧 | Problem-Solving | Complaints, requests, clarification |
| 📱 | Technology | Phones, apps, internet |
| 📚 | Education | Studying, classes, learning |

---

### Screen 2: Conversation

Layout (top to bottom):
1. **Header bar** — back button, selected theme name + emoji, AI status dot (green)
2. **Message list** — scrollable, flex-col, gap between messages
3. **Language toggle** — fixed above the input bar
4. **Input bar** — textarea + submit button, fixed at bottom

#### Message Bubbles

User messages:
- Aligned right, max-width 80%
- Background: `--user-bubble`, border: `--user-border`
- Bottom-right radius flattened to 4px (speech bubble tail effect)
- Label above: "You" in `--text3`

AI messages:
- Aligned left, max-width 82%
- Background: `--ai-bubble`, border: `--ai-border`
- Bottom-left radius flattened to 4px
- Label above: "老師" in `--text3`
- Font: use a CJK-compatible font stack:
  `font-family: 'Noto Sans HK', 'Noto Sans TC', sans-serif`

#### Language Toggle

Three pill buttons in a row, centered above the input bar:
`[漢字]  [Jyutping]  [English]`

- Active pill: `--purple` background, white text
- Inactive pill: transparent, `--text3`, border `--border2`
- Switching the toggle re-renders all AI message text using the already-parsed response data
- Never re-fetches from the API just to change display language

#### Grade Display

After each user submission, the AI response bubble includes:

1. A grade badge (inline, below the message text):
   - 8–10: green badge — "Good · X/10"
   - 5–7: yellow badge — "Okay · X/10"
   - 1–4: red badge — "Needs Work · X/10"

2. A hint button below the badge:
   - Default state: pill button labelled "💡 Show correction"
   - On click: expands a correction box directly below it (no page jump)
   - Correction box contains:
     - The improved sentence (large, in the active display language)
     - A brief explanation in English
     - A "Use this" button that replaces the user's last submitted message with the improved
       Cantonese version and re-submits it to continue the conversation

3. The hint button toggles open/closed. Animate height with a CSS transition (not display:none).

#### Typing Indicator

While waiting for the API response, show an animated typing indicator in an AI bubble:
three dots pulsing in sequence. Remove it when the response arrives.

#### Input Bar

- Textarea, auto-expanding up to 4 lines, then scrolls
- Submit on Enter (Shift+Enter for newline)
- Submit button disabled while API call is in-flight
- Clear textarea after submission
- If user submits empty input: do nothing (no API call)

---

## API Integration

### System Prompt Construction

```javascript
const systemPrompt = GLOBAL_PROMPT + "\n\n" + THEME_PROMPTS[selectedTheme];
```

All prompt text lives in a separate file `prompts.js`. Export `GLOBAL_PROMPT` and
`THEME_PROMPTS` as a keyed object. Copy the prompt content verbatim from
`cantonese_app_prompt.md`.

### API Call

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt,
    messages: conversationHistory   // full array of { role, content } objects
  })
});
```

Store `conversationHistory` in React state. Append both user and assistant turns after each
exchange. Reset to `[]` when the user navigates back to the theme screen.

### Response Parsing

Parse Claude's XML tags from the response text:

```javascript
function parseResponse(text) {
  const get = (tag) => {
    const match = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
    return match ? match[1].trim() : null;
  };
  return {
    cantonese:          get("cantonese"),
    jyutping:           get("jyutping"),
    english:            get("english"),
    score:              get("score"),           // e.g. "7/10"
    label:              get("label"),           // e.g. "Good"
    summary:            get("summary"),
    improved:           get("improved"),
    jyutping_improved:  get("jyutping_improved"),
    english_improved:   get("english_improved"),
    explanation:        get("explanation"),
  };
}
```

Store the parsed object on each AI message. The language toggle reads from this object —
never re-parses the raw text.

The first AI message (the opening scenario) will not have a grade block — handle that
gracefully (no badge, no hint button).

---

## State Shape (guidance, not prescription)

```javascript
{
  screen: "themes" | "chat",
  selectedTheme: string | null,
  displayLang: "cantonese" | "jyutping" | "english",
  messages: [
    {
      role: "user" | "ai",
      raw: string,               // raw text for history
      parsed: ParsedResponse,    // null for user messages
      hintOpen: boolean,         // whether correction box is expanded
    }
  ],
  conversationHistory: [{ role, content }],  // what gets sent to API
  loading: boolean,
}
```

---

## Edge Cases to Handle

| Situation | Behaviour |
|-----------|-----------|
| User types in English | Show their message, let AI respond (AI will redirect them per the system prompt) |
| User submits blank | Do nothing |
| API returns an error | Show a dismissible error banner in the chat: "Something went wrong — please try again" |
| No correction block in response | Hide grade badge and hint button entirely |
| User clicks "Use this" | Replace last user bubble text with improved Cantonese, add it to history, call API |
| Back button | Confirm if mid-conversation (>2 exchanges): "Leave this conversation?" — Yes resets state |

---

## File Structure

```
src/
  App.tsx              — top-level state, screen routing
  screens/
    ThemeSelect.tsx    — theme grid
    Chat.tsx           — chat UI, input bar, language toggle
  components/
    MessageBubble.tsx  — renders one message (user or AI)
    GradeBadge.tsx     — score badge
    HintBox.tsx        — collapsible correction panel
    TypingIndicator.tsx
  prompts.ts           — GLOBAL_PROMPT + THEME_PROMPTS object
  styles.css           — CSS variables + global resets only
```

---

## Do Not

- Do not add a login screen or any authentication
- Do not store conversation history to localStorage or any external service
- Do not add a backend or proxy — call the Anthropic API directly
- Do not use any UI component library (shadcn, MUI, Chakra, etc.)
- Do not add features not listed here — build exactly what is specified
- Do not hardcode the API key — read it from `import.meta.env.VITE_ANTHROPIC_API_KEY`

---

## Definition of Done

The app is complete when:

1. Theme selection screen renders all 14 cards correctly
2. Selecting a theme opens the chat screen and the AI sends an opening message
3. User can type a response, submit it, and receive a graded AI reply
4. Language toggle switches all AI message text without re-fetching
5. Hint button expands/collapses the correction box with animation
6. "Use this" button replaces the user message and continues the conversation
7. Typing indicator appears while the API call is in-flight
8. Back button returns to theme selection and resets conversation state
9. All colours match the specified scheme exactly
10. App works without errors in Chrome on desktop
