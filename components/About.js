import { Fragment } from "react";
import { ABOUT } from "@/content/principles";

/* About — each word is its own .w span so it brightens on scroll. */
export function About() {
  return (
    <section id="about" className="about container">
      <span className="label">(01) — About</span>
      <p className="about__text">
        {ABOUT.map((word, i) => (
          <Fragment key={i}>
            {i > 0 ? " " : null}
            {word.em ? <em className="w">{word.w}</em> : <span className="w">{word.w}</span>}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
