/*
  profile.js — the small set of facts that appear in several places.
  Update here, and the nav, hero, contact, footer, menu and summary modal
  all follow. (Native spelling of the site's data: docs/06-sections-and-content.md.)
*/

// The CV now lives inside the project's public/ folder. Drop the PDF at
// public/Amera_Mohammed_Software_Engineer.pdf and every CV link resolves.
export const CV_URL = "/Amera_Mohammed_Software_Engineer.pdf";

export const profile = {
  name: "Amera Mohammed",
  firstName: "Amera",
  lastName: "Mohammed",
  role: "Full-stack software engineer",
  kicker: "Full-stack software engineer —",
  location: "Mansoura, Egypt",
  locationShort: "Mansoura",
  availability: "open to relocation",
  // Contact target used 6× across the site.
  cvUrl: CV_URL,

  heroLead:
    "I write the API, design the database and ship the React front end. Then I teach 20+ developers a week how it was done.",

  now: {
    label: "Right now",
    role: "Full-stack engineer & mentor at Route Academy",
    note: "Finished ITI's Open Source track ranked 1st",
  },

  contact: {
    email: "ameraelsa3id@gmail.com",
    phone: "+20 102 168 5965",
    phoneHref: "tel:+201021685965",
    linkedin: "https://www.linkedin.com/in/AmiraElsa3id/",
    github: "https://github.com/AmiraElsa3id",
  },
};

// Short label under the contact email: "Mansoura, Egypt · open to relocation"
export const locationLine = `${profile.location} · ${profile.availability}`;
