import { CV_URL, locationLine, profile } from "@/content/profile";
import { Magnetic } from "@/components/ui/Magnetic";
import { Icon } from "@/components/ui/Icon";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { ThemeSwatches } from "@/components/theme/ThemeSwatches";

/* Contact + footer (the footer holds the palette switcher). */
export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <span className="label">(06) — Contact</span>

        <div className="contact__row">
          <h2 className="contact__title">
            <span className="line wipe">Let&apos;s</span>
            <span className="line wipe">talk.</span>
          </h2>
          <Magnetic>
            <a className="blob" href={`mailto:${profile.contact.email}`}>
              Say hello
              <Icon name="arrowUpRight" size={26} />
            </a>
          </Magnetic>
        </div>

        <div className="contact__row">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <a className="contact__email ul" href={`mailto:${profile.contact.email}`}>
                {profile.contact.email}
              </a>
              <CopyEmail email={profile.contact.email} />
            </div>
            <span className="contact__meta">
              <a className="ul" href={profile.contact.phoneHref}>
                {profile.contact.phone}
              </a>
              <span>{locationLine}</span>
            </span>
          </div>

          <div className="contact__socials">
            <a
              className="social"
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <Icon name="arrowUpRight" size={16} />
            </a>
            <a
              className="social"
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <Icon name="arrowUpRight" size={16} />
            </a>
            <a className="social" href={CV_URL} target="_blank" rel="noopener noreferrer">
              CV
              <Icon name="arrowUpRight" size={16} />
            </a>
          </div>
        </div>

        <footer className="footer">
          <span>© 2026 Amera Mohammed · designed &amp; built by me</span>
          <ThemeSwatches />
          <a href="#top" style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}>
            <span className="roll">
              <span data-t="Back to top ↑">Back to top ↑</span>
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}
