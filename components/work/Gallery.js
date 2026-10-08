import { FEATURED_PROJECTS } from "@/content/projects";
import { profile } from "@/content/profile";
import { Icon } from "@/components/ui/Icon";
import { ProjectCard } from "./ProjectCard";

/*
  Gallery — the pinned horizontal "Featured work" section.
  The section is tall and the track slides left on a CSS scroll timeline.
  The height is computed from the number of cards (the site's rule of thumb:
  ~500px more per card beyond the original six), so adding projects is safe.
*/
export function Gallery() {
  const total = FEATURED_PROJECTS.length;
  const height = 3300 + Math.max(0, total - 6) * 500;

  return (
    <section id="work" className="gallery" style={{ "--gallery-height": `${height}px` }}>
      <div className="gallery__pin">
        <div className="container gallery__head">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span className="label">(02) — Featured work</span>
            <h2 className="gallery__title">Things I&apos;ve built</h2>
          </div>
          <div className="gallery__meter" aria-hidden="true">
            <span className="label">{total} projects · real code &amp; demos</span>
            <span className="gallery__bar">
              <span />
            </span>
          </div>
        </div>

        <div className="track-wrap">
          <div className="track">
            {FEATURED_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} total={total} />
            ))}

            <div className="endcard">
              <a
                className="endlink"
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Everything
                <br />
                on GitHub
                <Icon name="arrowUpRight" size={28} strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
