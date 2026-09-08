# Context Clarity

A product concept exploring how ChatGPT could make usage limits, conversation context health, and memory state easier to understand and control.

<img width="1246" height="631" alt="image" src="https://github.com/user-attachments/assets/a316caf8-46d5-4f39-bc0f-e04dac7aee7a" />


**[Try the live demo](https://isaiahcampusano.github.io/gpt-recents-history/)**

Mock data only. This is an independent concept demo, not an official OpenAI product, and is not affiliated with or endorsed by OpenAI. No account data is accessed.

<!-- TODO: add current product screenshot -->

## Why I built it

While using ChatGPT across long-running projects, I found several forms of invisible state difficult to reason about: remaining usage, the health of a long conversation, and what information was being carried through memory.

My hypothesis: putting these signals and controls in one lightweight utility could help users decide when to continue, start fresh, or clean up context without adding friction to the main chat experience. I built an interactive React prototype to explore that idea.

## What the prototype explores

- Visibility into remaining feature usage and quotas.
- Conversation-health status for long-running chats.
- A “Summarize & start fresh” recovery path.
- Inspecting and editing saved memory, alongside a reference-history control.
- An experimental Session Clarity Score combining these signals.

## Implementation

Built with **React, TypeScript, Vite, and Tailwind CSS**. Static JSON fixtures supply the starting usage, conversation, and memory data.

The working UI includes animated quota bars, a conversation-health card, memory add/edit/delete interactions, a reference-history toggle, and a calculated Session Clarity Score. Memory changes and the toggle use local React state and reset on reload. Editing or deleting flagged memories updates the score; the reference-history toggle only changes its displayed state.

“Summarize & start fresh” opens a confirmation dialog and displays a temporary toast when confirmed. This demonstrates the interaction flow; it does **not** generate a summary or create a new conversation.

### What is mocked

Usage limits, reset times, token estimates, message counts, conversation-health labels, and memory-review flags are fixture values. Reset labels do not count down, and the app does not detect stale or conflicting memories. Saving an edit clears that memory’s existing flag.

There is no backend, authentication, model call, or integration with ChatGPT accounts. The displayed quotas and context scale are illustrative, not statements about actual ChatGPT limits or access to internal telemetry.

### About the Session Clarity Score

The score is an **exploratory abstraction, not a validated metric**. Its current weighting is:

- **70% quota headroom:** average remaining percentage across metered features.
- **25% conversation health:** a value assigned to the fixture’s health state.
- **5% memory hygiene:** a value reduced by the number of flagged memories.

These weights are assumptions used to make the concept testable. The result is not a measure of model accuracy or a reliable diagnosis of context quality. In a real product, I would first validate whether users understand or value a composite score before deciding whether it should exist at all.

## What I would test next

1. Do users understand conversation health without needing a composite score?
2. Which signal is most useful: usage, context health, or memory state?
3. Does “Summarize & start fresh” reduce friction in long-running workflows?
4. Does combining these controls in one destination feel helpful or overloaded?

## Run locally

Use Node.js 22.12+ (the deployment workflow uses Node 22). From the repository directory:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

The existing GitHub Actions workflow builds and deploys `main` to GitHub Pages.
