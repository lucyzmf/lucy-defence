/* =====================================================================
   EDIT THIS FILE — it's the only one you need to touch.
   Everything on the site is generated from what's below.

   Anything marked TODO is placeholder text.
   Fields marked (HTML ok) accept simple HTML like <a href="...">link</a>.
   ===================================================================== */

window.DEFENCE = {
  // Time zone of the venue. All times below are Paris time.
  timeZone: "Europe/Paris",
  // "en-GB" → 24-hour clock & "17 December"
  locale: "en-GB",

  person: {
    name: "Mingfang (Lucy) Zhang",
    degree: "PhD",
    university: "ENS-PSL, Rothschild Foundation Hospital",
  },

  thesis: {
    title: "Decoding communication from brain recordings: building the next generation of brain computer interfaces",
    supervisors: [
      "Pierre Bourdillon (thesis director) – Hospital Foundation Adolphe de Rothschild, Université Paris Cité",
      "Jean-Rémi King (co-director) – Meta AI",
    ],
    committee: [
      "Henri Lorach (reviewer) – University of Lausanne",
      "Leila Wehbe (reviewer) – Stanford University",
      "Sylvain Chevallier (examiner) – Université Paris-Saclay / Inria",
      "Alex Cayco Gajic (ENS representative) – École normale supérieure",
    ],
  },

  defence: {
    start: "2026-12-17T16:00", // YYYY-MM-DDTHH:MM, Paris time
    end: "2026-12-17T18:00",
    room: "Salle des Actes",
    building: "École normale supérieure (ENS-PSL)",
    address: "45 rue d'Ulm, 75005 Paris",
    mapQuery: "École normale supérieure, 45 rue d'Ulm, 75005 Paris",
    // Your Google Calendar invite link — used for the "Add to calendar: Google" link
    calendarUrl: "https://calendar.app.google/dwv2MtcWn7kL8Fh19",
    // (HTML ok) "Finding the room" text, shown above the map
    findRoom:
      "Check in at the reception (<em>Loge</em>, no. 1 on the map) at 45 rue d'Ulm with your photo ID. " +
      "Then take <strong>staircase A</strong> up to the <strong>1st floor</strong>: the Salle des Actes is the room on your right.",
    mapImage: "assets/ens-map.png",
    online: {
      show: true,
      // Tip: leave url empty and put the link in the Google Form confirmation message instead,
      // so it isn't public.
      url: "",
      note: "The livestream link will be shown after you register.",
    },
  },

  celebration: {
    show: true,
    title: "Post-defence celebration",
    start: "2026-12-17T19:30",
    end: "", // optional, e.g. "2026-12-17T23:00" — leave "" to just show "from 19:30"
    venue: "Ground Control",
    address: "81 rue du Charolais, 75012 Paris",
    // (HTML ok)
    details:
      "Drinks and food near Gare de Lyon — come for one or stay all evening. Partners, friends and family are all very welcome.",
  },

  rsvp: {
    // The LONG Google Form link (…/viewform), not the forms.gle short link
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd8Kni-pc8vPkOO5w2pzPtVc2wGYUKRdERdgI-R0JPuBHs-Kg/viewform",
    deadline: "2026-12-10", // TODO  last day to register (YYYY-MM-DD) — check with security how much notice they need
    formHeight: 1100, // pixels; increase if the embedded form shows its own scrollbar
  },

  contact: {
    email: "", // optional: shown at the bottom as "Questions? <email>"
    note: "Questions, or trouble with the form? Get in touch.",
  },

  // Shown automatically once the defence has finished.
  afterDefence: {
    headline: "It's official — the defence is done! 🎉",
    message: "Thank you so much to everyone who came, watched and supported along the way.",
  },
};
