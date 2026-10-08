import { SKILL_GROUPS } from "@/content/skills";

/* Skills — grouped exactly like the CV's skills block. */
export function Skills() {
  return (
    <section id="skills" className="skills container" aria-labelledby="skills-title">
      <div className="section-head" style={{ marginBottom: 44 }}>
        <h2 id="skills-title" className="h2 wipe">
          Toolbox
        </h2>
        <span className="label">(05) — What I reach for</span>
      </div>

      <div className="skgrid">
        {SKILL_GROUPS.map((group) => (
          <div className="skcell" key={group.label}>
            <span className="label">{group.label}</span>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
