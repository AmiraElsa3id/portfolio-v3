"use client";

import { useEffect, useRef, useState } from "react";
import { CHIPS, KB, answerFor } from "@/content/chat-kb";
import { Icon } from "@/components/ui/Icon";

/*
  ChatWidget — ported from assets/js/chat.js.
  Keyword-matched answers from the CV, "streamed" into the bubble word by
  word. The UI mirrors the original exactly (.fab / .chat / .msg / .qchip)
  and keeps the offline KB as fallback for the future RAG endpoint.
*/

let nextMessageId = 0;
const newId = () => `m${(nextMessageId += 1)}`;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState(() => [{ id: newId(), who: "bot", text: KB.intro }]);

  const logRef = useRef(null);
  const inputRef = useRef(null);
  const fabRef = useRef(null);
  const timers = useRef([]);

  // Keep the log pinned to the newest message.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages]);

  // Focus the input shortly after opening.
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(id);
  }, [open]);

  // Esc closes and returns focus to the launcher.
  useEffect(() => {
    if (!open) return;
    function onKey(event) {
      if (event.key === "Escape") {
        setOpen(false);
        fabRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Clear any pending timers on unmount.
  useEffect(
    () => () => {
      for (const id of timers.current) {
        clearTimeout(id);
        clearInterval(id);
      }
    },
    [],
  );

  function updateMessage(id, patch) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function ask(text, topic) {
    const question = String(text ?? "").trim();
    if (!question || busy) return;

    setBusy(true);
    const meId = newId();
    const botId = newId();
    setMessages((prev) => [
      ...prev,
      { id: meId, who: "me", text: question },
      { id: botId, who: "bot", text: "", typing: true },
    ]);

    const reply = answerFor(question, topic);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const startId = setTimeout(() => {
      if (reduce) {
        updateMessage(botId, { text: reply, typing: false });
        setBusy(false);
        return;
      }
      let i = 0;
      const intervalId = setInterval(() => {
        i = Math.min(reply.length, i + 3);
        updateMessage(botId, { text: reply.slice(0, i), typing: false });
        if (i >= reply.length) {
          clearInterval(intervalId);
          setBusy(false);
        }
      }, 18);
      timers.current.push(intervalId);
    }, 600);
    timers.current.push(startId);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const value = inputRef.current?.value ?? "";
    if (inputRef.current) inputRef.current.value = "";
    ask(value);
  }

  return (
    <>
      <div className="chat" id="chat" role="dialog" aria-label="Ask about Amera" hidden={!open}>
        <div className="chat__head">
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <strong style={{ fontSize: 15 }}>Ask about my work</strong>
            <span
              className="mono"
              style={{ fontSize: 11, color: "var(--muted)", letterSpacing: ".04em" }}
            >
              Answers come from my CV
            </span>
          </div>
          <button
            type="button"
            className="iconbtn"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        <div className="chat__log" ref={logRef} aria-live="polite">
          {messages.map((message) => (
            <div className={`msg msg--${message.who}`} key={message.id}>
              {message.typing ? (
                <span className="typing" aria-label="Typing">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                message.text
              )}
            </div>
          ))}
        </div>

        <div className="chat__chips">
          {CHIPS.map(([label, topic]) => (
            <button
              key={label}
              type="button"
              className="qchip"
              disabled={busy}
              onClick={() => ask(label, topic)}
            >
              {label}
            </button>
          ))}
        </div>

        <form className="chat__form" onSubmit={handleSubmit}>
          <label htmlFor="chat-input" className="sr-only">
            Your question
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            className="chat__input"
            type="text"
            autoComplete="off"
            placeholder="Ask about projects, stack, visa…"
          />
          <button type="submit" className="chat__send" aria-label="Send">
            <Icon name="arrowRight" size={18} />
          </button>
        </form>
      </div>

      <button
        type="button"
        className="fab"
        ref={fabRef}
        aria-expanded={open}
        aria-controls="chat"
        aria-label={open ? "Close chat" : "Ask about my work"}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="chat" size={18} />
        <span className="fab__text">{open ? "Close chat" : "Ask about my work"}</span>
      </button>
    </>
  );
}
