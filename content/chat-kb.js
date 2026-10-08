/*
  chat-kb.js — knowledge base + rules for "Ask about my work".
  Ported from assets/js/chat.js. Facts come from the CV only.

  Adding a topic:
    1. add KB.myTopic = "…"
    2. add ["myTopic", ["keyword", "another"]] to RULES (specific before broad)
    3. optionally add a suggested question to CHIPS

  Swapping in a real AI assistant (RAG over the CV) later: keep this file as
  the offline fallback and point answerFor() at a fetch() to /api/ask — see
  docs/09-backend-roadmap.md.
*/

export const KB = {
  intro: "Hi! I'm a small bot that answers from Amera's CV. Tap a question below or type your own.",
  stack:
    "Back end: Laravel, Django (with DRF) and Node/Express.\nFront end: React, Next.js, Vue, Angular and TypeScript.\nData: MySQL, PostgreSQL, MongoDB and Supabase.\nOps: Linux, Nginx, Docker and CI/CD.",
  resto:
    "RestoMind was my ITI graduation project, where I ranked 1st on the track. It's a restaurant platform that forecasts demand: Next.js front end, NestJS + MongoDB back end, and a Python FastAPI model.",
  ai: "I built an AI chat app with streamed replies, Whisper voice input and image generation, and the demand-forecasting model in RestoMind. I also work with RAG, pgvector and function calling.",
  reloc: "Yes. I'm based in Mansoura, Egypt and open to relocating or working remotely.",
  exp: "Since Sep 2024 I've been a full-stack engineer and mentor at Route Academy. Before that I spent a year as a WordPress & full-stack developer at Ave Events, where I cut page load by 25%.",
  edu: "B.Sc. Computer Science, Mansoura University (GPA 3.61, top 15%). M.Sc. in progress. Frontend diploma from Route Academy, and ITI's 9-month Open Source diploma, ranked 1st.",
  why: "I can own a feature from database to UI, I care about speed and security (25% faster pages, 15+ critical fixes inside 24 hours), and I can explain my work: I've taught 30+ workshops.",
  contact:
    "Email ameraelsa3id@gmail.com or call +20 102 168 5965. The CV is one click away in the top bar.",
  fallback:
    "That one isn't in my notes. Email Amera at ameraelsa3id@gmail.com and she'll answer properly.",
};

/* First matching rule wins, so specific topics come before broad ones. */
export const RULES = [
  ["resto", ["restomind", "restaurant", "graduation", "iti", "forecast"]],
  ["ai", [" ai ", " ai?", "llm", "gpt", "openai", "rag", "machine", "model", "whisper", "chat"]],
  ["reloc", ["relocat", "remote", "visa", "move", "where", "based", "location", "mansoura"]],
  [
    "stack",
    ["stack", "tech", "language", "framework", "laravel", "django", "react", "node", "skill"],
  ],
  ["exp", ["experience", "work", "job", "route", "ave", "company", "years"]],
  ["edu", ["education", "degree", "university", "gpa", "study", "master", "bsc"]],
  ["why", ["why", "hire", "strength", "best", "different"]],
  ["contact", ["contact", "email", "phone", "reach", "cv", "resume", "résumé"]],
];

export const CHIPS = [
  ["What's your stack?", "stack"],
  ["Tell me about RestoMind", "resto"],
  ["What AI work have you done?", "ai"],
  ["Open to relocation?", "reloc"],
  ["Why should we hire you?", "why"],
  ["How do I reach you?", "contact"],
];

export function topicFor(text) {
  const s = ` ${String(text).toLowerCase()} `;
  for (const [topic, keywords] of RULES) {
    if (keywords.some((keyword) => s.includes(keyword))) return topic;
  }
  return "fallback";
}

export function answerFor(text, topic) {
  return KB[topic || topicFor(text)] || KB.fallback;
}
