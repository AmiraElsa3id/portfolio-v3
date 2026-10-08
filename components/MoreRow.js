import { Icon } from "@/components/ui/Icon";

/*
  MoreRow — one row of "More builds". Hover fills the row with accent and a
  preview card (.mprev) follows the cursor. Replace the .mshot children with
  an <img> to show a real screenshot (CSS already handles object-fit).
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
