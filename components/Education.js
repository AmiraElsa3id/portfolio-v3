import { EDUCATION, HONORS, LANGUAGES } from "@/content/education";

/* Education + honours + languages. */
export function Education() {
  return (
    <section id="education" className="education container">
      <div className="section-head">
        <h2 className="h2 wipe">Education</h2>
        <span className="label">(04) — Learning &amp; recognition</span>
      </div>

      <div className="edu-grid">
        <div className="edu-list">
          {EDUCATION.map((entry) => (
            <div className="edu" key={entry.title}>
              <span className="edu__when">{entry.when}</span>
              <div className="edu__body">
                <h3 className="edu__title">
                  {entry.title}
                  {entry.rank ? (
                    <>
                      {" "}
                      <span className="rank">{entry.rank}</span>
                    </>
                  ) : null}
                </h3>
                <p>{entry.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="honors">
          {HONORS.map((honor) =>
            honor.medal ? (
              <div
                className="box"
                key={honor.title}
                style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}
              >
                <div className="medal" aria-hidden="true">
                  {honor.medal}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8, flex: "1 1 220px" }}
                >
                  <span className="honor-kicker">{honor.kicker}</span>
                  <span className="honor-title">{honor.title}</span>
                </div>
              </div>
            ) : (
              <div
                className="box"
                key={honor.title}
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span className="honor-kicker">{honor.kicker}</span>
                <span className="honor-title">{honor.title}</span>
              </div>
            ),
          )}

          <div
            className="box box--outline"
            style={{ display: "flex", flexDirection: "column", gap: 18 }}
          >
            <span className="label">Languages</span>
            {LANGUAGES.map((language) => (
              <div key={language.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <strong>{language.name}</strong>
                  <span style={{ color: "var(--muted)" }}>{language.level}</span>
                </div>
                <div className="lbar">
                  <span style={{ width: language.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
