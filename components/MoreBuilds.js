import { MORE_BUILDS } from "@/content/projects";
import { MoreRow } from "./MoreRow";

/* MoreBuilds — the "more builds" list (rows 07–12). */
export function MoreBuilds() {
  return (
    <section className="more container" aria-labelledby="more-title">
      <div className="section-head" style={{ marginBottom: 36 }}>
        <h2 id="more-title" className="more__title">
          More builds
        </h2>
        <span className="label">Front-end projects I built live while teaching</span>
      </div>

      <div className="mlist">
        {MORE_BUILDS.map((build) => (
          <MoreRow key={build.id} build={build} />
        ))}
      </div>
    </section>
  );
}
