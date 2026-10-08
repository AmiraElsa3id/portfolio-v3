import { EXPERIENCE } from "@/content/experience";
import { CV_URL } from "@/content/profile";
import { RichText } from "@/components/ui/RichText";
import { Magnetic } from "@/components/ui/Magnetic";
import { Icon } from "@/components/ui/Icon";

/* Experience — wording mirrors the CV. */
export function Experience() {
  return (
    <section id="experience" className="experience container">
      <div className="section-head">
        <h2 className="h2 wipe">Experience</h2>
        <Magnetic>
          <a className="btn btn--ghost" href={CV_URL} target="_blank" rel="noopener noreferrer">
            Full CV (PDF)
            <Icon name="download" size={18} />
          </a>
        </Magnetic>
      </div>

      <div className="xlist">
        {EXPERIENCE.map((job) => (
          <div className="xrow" key={`${job.title}-${job.when}`}>
            <div className="xrow__when">
              <span>{job.when}</span>
              <span>{job.org}</span>
            </div>
            <div className="xrow__body">
              <h3 className="xrow__title">{job.title}</h3>
              <ul>
                {job.bullets.map((bullet, i) => (
                  <li key={i}>
                    <span>
                      <RichText text={bullet} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
