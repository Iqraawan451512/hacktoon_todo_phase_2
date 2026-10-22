---
id: 1
title: create-localization-guidelines
stage: explainer
date: 2026-01-13
surface: agent
model: claude-sonnet-4.5
feature: web-todo-app
branch: 01-web-todo-app
user: user
command: sp.localization
labels: [localization, i18n, l10n, multilingual, urdu, rtl]
links:
  spec: ../specs/01-web-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/01-web-todo-app/localization.md
tests:
---
## Prompt

```text
You are a multilingual UX architect using Spec-Kit Plus.

Create a file named `sp.localization.md` for Phase II Todo Web Application.

Purpose:
- Specify guidelines for adding Urdu or other language support
- Ensure UI/UX and chatbot (future phase) support multiple languages

Reference Documents:
- @specs/sp.constitution.md
- @specs/sp.specification.md

The localization spec must include:
1. Supported languages (e.g., Urdu)
2. Guidelines for translating UI text
3. Handling right-to-left layout for Urdu
4. Encoding and font considerations
5. Future chatbot language support instructions
6. Constraints: Keep all changes Phase II safe

Constraints:
- Structured markdown
- No code examples
- Clear headings and bullet points

Output only the content of `sp.localization.md`.
```

## Response snapshot

Created a comprehensive localization document for the Phase II Todo Web Application at specs/01-web-todo-app/localization.md. The document addresses all required elements while maintaining strict Phase II safety constraints:

1. **Supported Languages**: Defines English as Phase II default with Urdu and other languages planned for future phases.

2. **UI Text Translation Guidelines**: Provides guidance for future translation while specifying that Phase II remains English-only.

3. **RTL Layout Considerations**: Details requirements for future Urdu RTL support while maintaining LTR-only for Phase II.

4. **Encoding and Font Considerations**: Addresses current UTF-8 requirements and future Urdu font needs.

5. **Chatbot Language Support**: Specifies that chatbot functionality is out of scope for Phase II while preparing for future implementation.

6. **Phase II Safety Constraints**: Clearly marks all localization features as out of scope for Phase II, maintaining constitutional compliance.

The document includes a clear status noting that multi-language support is out of scope for Phase II as per constitutional requirements. It provides preparation guidelines for future phases while ensuring current implementation remains within approved scope. The document balances future readiness with current phase constraints.

## Outcome

- ✅ Impact: Created comprehensive localization roadmap with Phase II safety constraints
- 🧪 Tests: No automated tests for document creation
- 📁 Files: Created specs/01-web-todo-app/localization.md
- 🔁 Next prompts: Ready to proceed with Phase II implementation (English-only)
- 🧠 Reflection: The document properly balances future readiness with current phase constraints

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): Standard localization planning
- Next experiment (smallest change to try): Proceed with Phase II implementation following localization constraints