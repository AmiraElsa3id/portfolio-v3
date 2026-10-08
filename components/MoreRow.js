import { Icon } from "@/components/ui/Icon";

/*
  MoreRow — one row of "More builds". Hover fills the row with accent and a
  preview card (.mprev) follows the cursor. When build.image is set (a real
  screenshot in public/images/) it shows the image; otherwise the mock-browser
  wireframe is drawn from build.shot.
*/
export function MoreRow({ build }) {
  return (
    <a className="mrow" href={build.href} target="_blank" rel="noopener noreferrer">
      <span className="mono mrow__muted">{build.num}</span>
      <span className="mrow__name">{build.name}</span>
      <span className="mrow__muted mrow__hide-sm">{build.summary}</span>
      <span className="mono mrow__muted mrow__hide-sm" style={{ fontSize: 12 }}>
        {build.stack}
      </span>

      <span className="mprev" aria-hidden="true">
        {build.image ? (
          <span className="mshot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={build.image} alt={`${build.name} screenshot`} loading="lazy" />
          </span>
        ) : (
          <span className="mshot" style={{ background: build.shot.bg, color: build.shot.color }}>
            <span className="mbar">
              <i />
              <i />
              <i />
            </span>
            <span className="mwire">
              <b />
              <b />
              <b />
            </span>
            <span className="mname" lang={build.shot.lang}>
              {build.shot.name}
            </span>
          </span>
        )}
        <span className="mbrief">
          <b>{build.cta}</b>
          {build.brief}
        </span>
      </span>

      <span className="mrow__arrow">
        <Icon name="arrowRight" size={24} strokeWidth={1.8} />
      </span>
    </a>
  );
}
