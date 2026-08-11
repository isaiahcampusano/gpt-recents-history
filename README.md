# Context Clarity

Context Clarity is a front-end concept for a clearer, more honest ChatGPT usage dashboard. It shows what it might look like to explain three separate mechanisms in one place:

- headroom for metered features such as images, uploads, voice, and Thinking mode;
- context health for the **single conversation currently open**; and
- saved memories and reference-chat-history settings that can affect future conversations.

The dashboard uses static mock data. It does not connect to an OpenAI account, read conversation history, or claim that deleting inactive chats improves other conversations. There is no public consumer API for the usage and memory data represented here.

## Run locally

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run build
npm run preview
```

## What is interactive

- Quota bars animate on load and explain reset timing.
- The conversation card explains context rot and demonstrates a mock “Summarize & start fresh” flow.
- Saved memories can be edited or deleted in local React state.
- Reference chat history can be toggled on and off.
- The Session Clarity score recalculates from quota headroom, current-conversation health, and flagged memories.

All edits reset when the page reloads.

## How the score works

The composite score is intentionally labeled **Session Clarity**, not account health. It combines:

- average remaining quota headroom: 70%;
- active-conversation health: 25%; and
- memory-hygiene suggestions: 5%.

Unlimited text chat is shown as a status, not included as a quota percentage.

## Sources and product grounding

- [Chroma Research — Context Rot](https://www.trychroma.com/research/context-rot)
- [ProductTalk — a plain-language context rot explainer](https://www.producttalk.org/context-rot/)
- [OpenAI — Memory and new controls for ChatGPT](https://openai.com/index/memory-and-new-controls-for-chatgpt/)
- [OpenAI Help Center — How does Reference saved memories work?](https://help.openai.com/en/articles/11146739-how-does-reference-saved-memories-work)
- [OpenAI — Improving GPT-5.6 Sol in ChatGPT](https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/)

This repository is a product-design demo, not an official OpenAI product.
