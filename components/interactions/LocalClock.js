"use client";

import { useEffect, useState } from "react";

/*
  LocalClock — ported from main.js §6. Shows the local time in Cairo,
  refreshing every 20 seconds. Renders "--:--" on the server so there is no
  hydration mismatch; the effect fills in the real time on the client.
*/
export function LocalClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    function tick() {
      let next = "";
      try {
        next = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Cairo",
        });
      } catch {
        next = "";
      }
      setTime(next);
    }
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  return <span data-js="clock">{time}</span>;
}
