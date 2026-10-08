# Roadmap — after the first Next.js version

The ported site ships the **offline keyword chat** and nothing that needs a
server. Everything below is deliberately *not* implemented yet; this is the
plan we agreed to write down first.

## A. RAG chat over the CV (next up)

Replace the keyword bot's `answerFor()` with a real, streamed answer while
keeping `content/chat-kb.js` as the offline fallback.

```
Browser ──POST /api/ask──▶ Next.js Route Handler ──▶ Hugging Face Inference API
   ▲                                                     (free tier model)
   └──────────── streamed tokens (ReadableStream) ───────┘
```

**Why a Route Handler first (v1):** no extra infra, works on Vercel, and the
`ChatWidget` already streams. The KB is small enough to pass as context
directly — no vector DB needed yet.

**Steps**
1. `app/api/ask/route.js` — POST `{ question, history }`.
   - Validate: max 300 chars, strip control chars, basic prompt-injection filter.
   - Build the system prompt: *"Answer only from CONTEXT, in first person as
     Amera, ≤ 80 words; if unknown say so and give the email."*
   - CONTEXT = the exported `KB` values (+ `data/portfolio.json` facts).
   - Call Hugging Face (`HF_MODEL`) with `stream: true`; forward the stream.
2. `ChatWidget` — if the route returns `200`, stream the body into the bubble;
   on any error, fall back to the local `answerFor()` (already in place).
3. Env (already stubbed in `.env.example` / `.env.local`):
   `HF_TOKEN`, `HF_MODEL`.
4. Rate limit (10 req/min/IP) + logging once it's live.

**Open decisions**
- Which Hugging Face model (must support streaming chat completions).
- Whether to keep it context-only or add embeddings later (pgvector on
  Neon/Supabase) once the CV + project write-ups get large.
- Hardening: Upstash Redis for rate limits, `Cache-Control`/ETag for `GET` routes.

## B. Other small services (later)

| Feature | Shape |
|---|---|
| Secret terminal (`~`) | overlay + `/api/me`, `/api/projects`, `/api/stats`, `/api/hire` (validation, honeypot, rate limit) |
| 30-second game + leaderboard | server-signed runs, server-side replay/scoring, Redis ZSET, profanity filter, RBAC admin |
| Live GitHub strip | `/api/github` (server-side, cached 1h) → last 5 commits + language breakdown |
| Contact form → email | server-side validation + Turnstile, logged, emailed |

The original long-form notes live in the static site's `docs/09-backend-roadmap.md`
(kept on disk under `assets/`, excluded from git).
