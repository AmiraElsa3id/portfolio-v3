import { syne, manrope, jetbrainsMono } from "./fonts";
import "./globals.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/responsive.css";
import "./styles/nextjs-additions.css";
import "./styles/projects.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SummaryProvider } from "@/components/summary/SummaryProvider";
import { ProjectProvider } from "@/components/work/ProjectProvider";

const SITE_DESCRIPTION =
  "Amera Mohammed — full-stack software engineer in Mansoura, Egypt. Laravel, Django and Node APIs behind React and Next.js front ends. Ranked 1st on ITI's Open Source track. Open to relocation.";

export const metadata = {
  title: "Amera Mohammed — Full-stack Software Engineer",
  description: SITE_DESCRIPTION,
  authors: [{ name: "Amera Mohammed" }],
  openGraph: {
    title: "Amera Mohammed — Full-stack Software Engineer",
    description:
      "Laravel, Django and Node APIs behind React and Next.js front ends. Open to relocation.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C0D0B",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark-lime"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${syne.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Apply the saved palette before first paint — avoids a colour flash.
            Ported verbatim from the static site's <head> script. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("amera-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SummaryProvider>
            <ProjectProvider>{children}</ProjectProvider>
          </SummaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
