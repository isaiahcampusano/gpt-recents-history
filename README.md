## 1. Executive recommendation

Context Clarity should become a dedicated destination inside the ChatGPT sidebar, rendered entirely within the main conversation canvas. This matches the hierarchy of Library, Projects, and Scheduled in the reference screenshot: it is a utility view, not a separate dashboard or marketing page. Keeping the standard sidebar visible reinforces that the user is still inside ChatGPT; the feature feels like a native, discoverable tool rather than an external analytics product.

The main canvas will host a compact session summary, followed by three clearly separated sections (Usage, Current conversation, Memory) in a single scrolling column constrained to a readable maximum width. The oversized hero and brand navigation will be removed. All content will follow the dark, restrained visual language of the screenshot—black surfaces, white/gray text, subtle borders, and semantic status accents used sparingly. The “Summarize & start fresh” action will live inside the conversation-health area and, conceptually, could also appear as a contextual action on a long conversation.

This integration model leverages the existing sidebar real estate without modifying the core shell, keeps the three data domains distinct, and allows the feature to scale down gracefully on smaller screens (collapsing the sidebar, stacking sections). It is the shortest path to a design that feels like a ChatGPT feature, not a separate product.

---

## 2. How the current demo works

The demo loads three JSON fixtures (`activeConversation.json`, `memories.json`, `quotas.json`) at the top of `App.tsx`. All data is static mock content.

- **State management**  
  `App` holds `memories` (array), `referenceChatHistoryEnabled` (boolean), and `editingMemory` (nullable) in local React state. Memory edits (add, update, delete) are applied in memory and reset on reload. No other state is persisted.

- **Score calculation**  
  The `SessionClarityScore` component receives a computed `score` prop derived from:
  ```
  quotaHeadroom = average of percentage headrooms (excluding unlimited text)
  conversationHealthScore = 100 / 70 / 30 (green/yellow/red)
  memoryScore = 100 – (5 × flaggedCount)
  score = 0.70 × quotaHeadroom + 0.25 × conversationHealthScore + 0.05 × memoryScore
  ```
  This is displayed as a single numeric session score, correctly scoped to the session.

- **Component breakdown**  
  `App` renders a layout with its own brand header, a hero area (`SessionClarityScore`), and a dashboard grid of three panels: `UsageClarityGauge` (animated quota bars), `ConversationHealthCard` (status + “Summarize & start fresh” button), and `MemoryHygienePanel` (memory list + add/edit/delete controls + reference-chat toggle). Each panel has a `PanelHeader`.

- **Interactions**  
  - Quota bars animate on mount (CSS transitions).
  - “Summarize & start fresh” triggers a confirmation dialog (`window.confirm`) and a toast (custom state-based message).
  - Memory list supports inline editing, deletion, and addition.
  - Reference chat history toggle is a checkbox.

- **Reusability**  
  The three domain card components contain the core logic and could be reused with restyling. `SessionClarityScore` will shrink from a hero card to a compact summary module. `PanelHeader` can be generalized. The overall page layout and navigation must be replaced entirely.

- **Weaknesses**  
  - The separate brand and light theme disconnect it from ChatGPT.
  - The hero card and editorial typography make it read as a landing page.
  - No obvious path to navigate “back to chatting”; the feature is an island.
  - No responsive adaptation beyond stacking cards.
  - The score weighting is arbitrary and not exposed to the user, which might cause confusion.

---

## 3. Screenshot-based UI analysis

From the reference description (dark desktop interface):

- **Surfaces**  
  - Sidebar and main canvas: nearly black (`#000000` or `#0D0D0D`).  
  - Selected sidebar item: dark gray rounded background (`#2A2A2A`–`#333333`).  
  - Card backgrounds: not directly visible, but likely the same black or slightly elevated charcoal; no stark white cards.

- **Typography**  
  - Sans-serif system font (likely `Inter` or `SF Pro`).  
  - Primary text: white (`#FFFFFF`).  
  - Section labels and secondary text: muted gray (`#9CA3AF`–`#6B7280`).  
  - No serif or display faces used.

- **Icons**  
  - Simple line icons, stroke weight ~1.5–2px, size ~16–20px.  
  - Used for navigation items and controls, not as decorative large elements.

- **Spacing & layout**  
  - Sidebar width roughly 390 px (per screenshot).  
  - Sidebar items have compact vertical rhythm (padding ~6–8px vertical, ~12px horizontal).  
  - Dividers are subtle, 1px solid with low opacity.  
  - Main canvas: large empty area for chat, with composer at the bottom.  
  - Utility views (like settings) likely use a narrower content column (max-width ~640–720 px) centered or left-aligned.

- **Borders & radii**  
  - Rounded corners are moderate (8–12 px).  
  - Borders used only for input/composer; otherwise, surfaces are flat with no outlines.

- **Color accents**  
  - Accent colors (green, amber, red) appear only as status indicators, not decorative splashes.  
  - No large colored backgrounds.

- **What NOT to copy**  
  - The exact list of sidebar items (Library, Projects, etc.) may vary by account, region, or feature flags. We should use a representative but generic set.  
  - The screenshot likely shows a user’s personal pinned/recent conversations; we must use demo labels.  
  - Browser chrome (address bar, tabs) is not part of the product.  
  - The large empty chat canvas in the screenshot is the conversation view, not a template for this feature’s layout.

---

## 4. Proposed user flow and information architecture

**Navigation**  
- The standard ChatGPT sidebar gains a new entry: **“Context clarity”** (or “Usage & context”). It sits below the “More” section or among utility destinations.  
- Clicking it renders the feature in the main canvas. The sidebar remains fully visible and interactive; selecting a different sidebar item navigates away.  
- The feature view does not replace the shell; the user’s conversation is preserved in its own canvas, reachable via the “New chat” or a specific chat in Recents.

**Main canvas layout**  
1. **Compact session summary** (replacing hero)  
   - Displays the numeric Session Clarity Score, a brief label (“Session clarity”), and a one-line description.  
   - Visual: small card or inline badge, no heavy background color.

2. **Usage**  
   - Horizontal or vertical bar charts for each metered quota (images, uploads, voice, Thinking).  
   - “Unlimited standard text” shown as a plain status line.  
   - Animated on mount, with clear numeric/percentage labels.

3. **Current conversation**  
   - Health status (green/yellow/red) with text explanation and estimated token/context usage.  
   - “Summarize & start fresh” button with a confirmation dialog.  
   - Contextually, this action could also be offered in the conversation’s own overflow menu (but not required for the demo).

4. **Memory**  
   - List of saved memories with inline edit/delete controls.  
   - “Add memory” input row.  
   - Toggle for reference chat history.  
   - Warning/notice for flagged or conflicting memories.

**Cross-feature clarity**  
- Each section header will include a short tooltip or label explaining its scope:  
  - “Usage – remaining quotas for your account”  
  - “Current conversation – health of this chat only”  
  - “Memory – saved facts and reference history”  
- The session score will have a tooltip clarifying its composition and that it is session-scoped.

**Mobile / responsive**  
- On narrower viewports (<768px), the sidebar can be toggled or hidden (like current ChatGPT mobile web). The main canvas will stack sections vertically with full width, preserving readability.

---

## 5. Design-system mapping

| Token category | Screenshot inference | Proposed value (Tailwind class) |
|----------------|----------------------|----------------------------------|
| Page background | Black / very dark gray | `bg-black` or `bg-neutral-950` |
| Sidebar surface | Black, same as page | `bg-black` |
| Selected sidebar item | Dark gray rounded | `bg-neutral-800`, `rounded-lg` |
| Primary text | White | `text-white` |
| Secondary / muted text | Gray ~400–500 | `text-gray-400` |
| Section labels | Muted gray, uppercase? | `text-gray-500 text-xs tracking-wide` |
| Dividers | 1px, low opacity white | `border-white/10` |
| Card / panel background | Slightly elevated (dark charcoal) | `bg-neutral-900` or `bg-neutral-800/50` |
| Card border | None (flat) or subtle 1px border | `border border-white/5` |
| Corner radius | 8–12px | `rounded-xl` (12px) |
| Focus ring | White ring with offset | `ring-2 ring-white ring-offset-2 ring-offset-black` |
| Icon size | 16–20px | `w-4 h-4` or `w-5 h-5` |
| Icon stroke | Thin, consistent | Lucide default (strokeWidth 2) |
| Semantic status colors | Green, Amber, Red | `bg-green-500`, `bg-amber-500`, `bg-red-500` (used only for indicators/bars) |
| Typography | System sans-serif | `font-sans` (Tailwind default) |
| Headings | Smaller, semi-bold | `text-base font-semibold` or `text-lg` |
| Spacing scale | Dense, 4px increments | `p-4`, `gap-4`, `space-y-3` |
| Max content width | ~640–720px | `max-w-2xl` (672px) |

**Component treatments**  
- Quota bars: thin height (8px), neutral-800 track, semantic fill, rounded full.  
- Buttons: bordered outline style (`border-gray-600 text-white hover:bg-neutral-800`), or subtle ghost style.  
- Primary action (e.g., “Summarize & start fresh”): could use a white/light text on neutral-800 background, not a bright accent unless consistent with the screenshot’s primary button (which appears rarely).  
- Toast: dark background, light text, slim horizontal bar at the top of the canvas.

---

## 6. Proposed component tree

```
<AppShell>
  <Sidebar>
    <SidebarItem label="New chat" />
    <SidebarSection title="Pinned" />
    ...
    <SidebarItem label="Context clarity" active />  // active state controls view
    <SidebarSection title="Recents" />
    ...
    <UserControls />
  </Sidebar>
  <MainCanvas>
    // Conditionally render:
    <ContextClarityView>
      <SessionSummary score={score} />
      <UsageClarityGauge quotas={quotas} />
      <ConversationHealthCard conversation={conversation} onSummarize={...} />
      <MemoryHygienePanel
        memories={memories}
        onAdd={...} onEdit={...} onDelete={...}
        referenceEnabled={referenceChatHistoryEnabled}
        onToggleReference={...}
      />
    </ContextClarityView>
    // Else placeholder/conversation (not built)
  </MainCanvas>
</AppShell>
```

`ContextClarityView` will be a single column container with `max-w-2xl mx-auto py-8 px-4`, stacking sections with headings and dividers. Each domain component will be restyled to match the dark theme, losing the card-heavy dashboard aesthetic.

---

## 7. File-by-file implementation plan

**Phase 0 – Audit existing components**  
- Keep `UsageClarityGauge`, `ConversationHealthCard`, `MemoryHygienePanel`, and `SessionClarityScore` largely intact in logic, but remove hardcoded light backgrounds and replace with Tailwind dark classes.  
- Extract `PanelHeader` into a simpler `SectionHeader` with consistent muted labels.

**Phase 1 – Shell and navigation**  
1. Create `src/components/Sidebar.tsx` – static sidebar with mock items including “Context clarity”. Use local state (`activeItem`) passed from `App`. Style to match screenshot (black, gray selections, icons).  
2. Create `src/components/MainCanvas.tsx` – renders `children` inside a main area with black background and min-height.  
3. Update `App.tsx` to wrap everything in a flex layout: `Sidebar` + `MainCanvas`, and conditionally show `ContextClarityView` when the sidebar item is active.  
4. Remove the old navigation bar and page background gradient.  
5. Ensure the sidebar width is fixed (390px) on desktop, with a responsive toggle on mobile.

**Phase 2 – Restyle the feature view**  
6. Create `src/components/ContextClarityView.tsx` – the layout container (max-w-2xl, padding, section spacing). It receives all data and state handlers as props.  
7. Refactor `SessionClarityScore` into a compact inline summary: small card, score number, label, tooltip, no hero background.  
8. Restyle `UsageClarityGauge`: dark bars, neutral backgrounds, labels with muted text. Keep animations.  
9. Restyle `ConversationHealthCard`: flat dark panel, status dot + text, action button outline.  
10. Restyle `MemoryHygienePanel`: list items in a simple stacked layout, inline editing inputs with dark styling, reference toggle.  
11. Remove `PanelHeader.tsx` and replace with a shared `SectionHeading` (title, optional tooltip).  
12. Create a shared `Tooltip` component (or use a lightweight CSS tooltip) for clarity labels and score explanation.  
13. Add a small “Mock data” indicator—a subtle text badge near the top of the view: “Demo data · not connected to your account” (using `text-gray-500 text-xs`).

**Phase 3 – State and interactions**  
14. Lift all state and score calculation from old `App.tsx` into `ContextClarityView` or a custom hook (`useContextClarity`).  
15. Keep `window.confirm` for “Summarize & start fresh” (no custom dialog to avoid complexity, but style the confirmation message).  
16. Implement toast as a temporary state in `App` (a small fixed bar at top), dismissed after 3s.

**Phase 4 – Responsive and polish**  
17. Add responsive breakpoint: below `md`, sidebar hides (or collapses to an overlay), main canvas takes full width, sections stack.  
18. Add keyboard navigation and focus management for memory editing.  
19. Ensure all status indicators have text labels alongside color, and animated elements respect `prefers-reduced-motion`.  
20. No router is needed; simple conditional rendering suffices.  
21. Update `vite.config.ts` base path unchanged, GitHub Actions deploy unchanged.

**New files to create**  
- `src/components/Sidebar.tsx`
- `src/components/MainCanvas.tsx`
- `src/components/ContextClarityView.tsx`
- `src/components/SectionHeading.tsx`
- `src/components/Tooltip.tsx` (optional)

**Files to modify**  
- `src/App.tsx` – restructured as shell
- `src/components/SessionClarityScore.tsx`
- `src/components/UsageClarityGauge.tsx`
- `src/components/ConversationHealthCard.tsx`
- `src/components/MemoryHygienePanel.tsx`
- `src/index.css` – remove light background, add new utility classes if needed

**Files to delete**  
- `src/components/PanelHeader.tsx` (replaced)

**Tests and acceptance checks**  
- All existing interactions (quota animation, memory CRUD, toggle, summarize confirmation, toast) still work.  
- The UI matches the dark theme and structure of the reference screenshot (sidebar with selected item, main content column).  
- On mobile, sidebar collapses and content is readable.  
- No color-only health communication; each status has a text label.  
- Reduced motion disables bar animations.  
- “Mock data” label is always visible but unobtrusive.

---

## 8. Accessibility and responsive checklist

**Responsive**  
- Desktop: fixed sidebar (390px) + flexible main column (max-w-2xl centered).  
- Tablet (<1024px): sidebar may narrow or collapse; provide a hamburger toggle (follows ChatGPT’s existing pattern if known; otherwise hide sidebar, show an overlay toggle).  
- Mobile (<640px): single column, full-width sections, no horizontal scroll.

**Keyboard & focus**  
- Tab order: sidebar items → main content interactive elements (buttons, inputs, toggles).  
- Memory edit: pressing Enter saves, Escape cancels, focus trap inside inline edit not needed but managed with refs.  
- Dialog (“Summarize & start fresh”): currently `window.confirm` is accessible but non-styled; acceptable for demo. If a custom modal is added, trap focus and return focus to trigger.

**Color & status**  
- Every semantic color has an accompanying text label (e.g., “Healthy”, “Approaching limit”, “Exhausted”).  
- Quota bars include percentage text.  
- Conversation health displays word “Good”, “Warning”, “Critical”.  
- Memory flagged items show a warning icon and text.

**Motion**  
- Quota bar animation wrapped in `prefers-reduced-motion` media query: disable transition/animation.  
- Score number does not animate; static value avoids vestibular triggers.

**Contrast**  
- All text on dark backgrounds meets WCAG AA (white on black, gray #9CA3AF on black passes). Status colors on black backgrounds: ensure text inside colored badges has sufficient contrast (use dark text on bright green, or white on darker green with a check; prefer outline badges with colored dot + white text). That approach ensures contrast.

**Tooltips**  
- Provide tooltip on hover/focus for section headers and score; ensure they are dismissible and do not obstruct content.

---

## 9. Risks and open questions

- **Sidebar item name and placement** – “Context clarity” might overlap with future official features. The exact spot in the sidebar (below “More” vs. a separate section) is an educated guess; the demo should treat the item’s position as flexible via props.
- **ChatGPT sidebar variability** – The screenshot shows specific items that may not exist for all users. The demo sidebar will use a plausible but generic structure, acknowledging this limitation.
- **“Summarize & start fresh” outside the feature** – The prompt suggests it could be a contextual action. The current plan only places it inside the Context Clarity view. A future iteration could add it to the conversation canvas overlay, but not now.
- **Mobile sidebar behavior** – We lack the exact ChatGPT mobile web pattern. We’ll implement a simple overlay toggle to remain functional.
- **No real account integration** – The mock data and demo labeling prevent confusion, but users might still expect live values. The subtle banner must be prominent enough.
- **Score weighting** – The current algorithm is arbitrary. Keeping the score visible might invite scrutiny; we can add an information tooltip explaining it’s a demo heuristic.
- **Performance** – All static, no concerns.

These risks are manageable within the scope, and the proposed implementation directly addresses the success criteria.
