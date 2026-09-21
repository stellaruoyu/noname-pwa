# Learning Mode Design Brief

## Decision

Learning Mode will open inside the original noname PWA layout with a new **Learning Mode** menu entry. The first release will support **Standard 1v1 only**.

The original noname rules, card definitions, character definitions, turn order, AI, and interaction model remain the source of truth. Learning Mode adds translation and explanation layers; it does not replace the game engine with a second rules engine.

## Language behavior

| Mode | Card and character labels | Ability explanations |
|---|---|---|
| English only | English only | English only |
| Chinese only | Chinese only | Chinese only |
| Both | English · Chinese | English · Chinese |

The language mode is global and must affect menus, prompts, action buttons, cards, character names, ability help, and error messages.

## Proposed screen structure

1. Original PWA shell and menu remain unchanged.
2. Add a Learning Mode entry beside the existing game/mode choices.
3. Reuse the original `#arena`, `.player`, card, equipment, judgment, and history regions.
4. Add a small learning toolbar beside the action controls:
   - language selector: English / 中文 / Both
   - **How to play**
   - **Show ability**
   - **Explain last action**
5. Show ability explanations in a non-blocking side panel or anchored help panel so the game table remains visible.
6. Keep the original action prompts and card targeting behavior. Learning text explains the current prompt instead of creating a parallel prompt system.

## Reuse map

- `noname.js`: application entry and engine integration point.
- `layout/newlayout/` and `layout/nova/`: visual layout and player/table styling.
- `card/standard.js`: Standard card definitions and rules.
- `character/old.js` plus the relevant standard character package: character skills and translations.
- `mode/identity.js` or the appropriate standard mode: turn flow, victory, AI, and target selection.
- Existing `theme/` assets: table, frame, fonts, card art, and PWA visual identity.

## Open decisions for review

- Recommendation: keep the help panel on the right on desktop and as a bottom drawer on small screens.
- Recommendation: show ability help only for the player’s selected character by default; allow “Explain opponent” from the player card.
- Recommendation: begin with read-only explanations and engine-driven actions, then add guided practice checkpoints after the shell is stable.
- Recommendation: preserve the original history bar, because it helps learners understand why an action was accepted or rejected.

## Acceptance criteria

- Starting Learning Mode visibly uses the original noname PWA shell.
- A Standard 1v1 can be played with the original rules and AI.
- Language mode never shows a second language unless **Both** is selected.
- Every standard character has HP, translated name, and ability help.
- Ability help never covers the player’s hand, the target prompt, or the original action controls.
- The first version does not add 2v2 until Standard 1v1 is stable.
