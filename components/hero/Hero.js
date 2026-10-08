import { FEATURED_COUNT } from "@/content/projects";
import { CV_URL, profile } from "@/content/profile";
import { Magnetic } from "@/components/ui/Magnetic";
import { Icon } from "@/components/ui/Icon";
import { AsciiField } from "./AsciiField";

/* Hero — ported from index.html §HERO. */
export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__fallback" aria-hidden="true" />
      <AsciiField />

      <div className="container hero__content">
        <div className="hero__meta fade hero-out">
          <span className="chip">
            {profile.location} · {profile.availability}
          </span>
        </div>

        <div className="hero-out hero__namewrap">
          <p className="hero__kicker blend fade" style={{ animationDelay: ".1s" }}>
            {profile.kicker}
          </p>
          <h1 className="hero__name blend">
            <span className="line">
              <span className="rise" style={{ animationDelay: ".05s" }}>
                {profile.firstName}
              </span>
            </span>
            <span className="line">
              <span className="rise" style={{ animationDelay: ".15s" }}>
                {profile.lastName}
              </span>
            </span>
          </h1>
        </div>

        <div className="hero__bottom hero-out">
          <div className="hero__intro fade" style={{ animationDelay: ".3s" }}>
            <p className="hero__lead">{profile.heroLead}</p>
            <div className="hero__ctas">
              <Magnetic>
                <a className="btn btn--solid" href="#work">
                  See {FEATURED_COUNT} projects
                  <Icon name="arrowRight" size={18} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  className="btn btn--ghost"
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV
                  <Icon name="download" size={18} />
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="hero__side fade" style={{ animationDelay: ".45s" }}>
            <div className="now-card">
              <span className="label">{profile.now.label}</span>
              <strong>{profile.now.role}</strong>
              <span>
                Finished ITI&apos;s Open Source track <b>ranked 1st</b>
              </span>
            </div>
            <div className="scroll-cue" aria-hidden="true">
              <span>Scroll</span>
              <span className="scroll-cue__line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
