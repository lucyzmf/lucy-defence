/* =====================================================================
   EDIT THIS FILE — it's the only one you need to touch.
   Everything on the site (dates, countdown, calendar buttons, map,
   registration form, schedule, FAQ) is generated from what's below.

   Anything marked TODO is placeholder text.
   Fields marked (HTML ok) accept simple HTML like <a href="...">link</a>.
   ===================================================================== */

window.DEFENCE = {
  // Time zone of the venue. All times below are entered in this zone's local time.
  // Examples: "Europe/London", "Europe/Amsterdam", "Europe/Berlin", "America/Toronto",
  // "Australia/Sydney". Full list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  timeZone: "Europe/Paris",

  // Controls date/time formatting. "en-GB" → 24-hour clock & "20 January"; "en-US" → 12-hour.
  locale: "en-GB",

  person: {
    name: "Mingfang (Lucy) Zhang", // TODO
    degree: "PhD",
    university: "ENS-PSL, Rothschild Foundation Hospital", // TODO
    // photo: "", // optional, e.g. "assets/lucy.jpg" (put the image in an assets/ folder)
  },

  thesis: {
    title: "Decoding communication from brain recordings: building the next generation of brain computer interfaces",
    // (HTML ok) A short, friendly summary for family and friends.
    abstract:
      "Saying or typing even a short sentence means the brain has to turn an idea into a precisely ordered sequence of movements. " +
      "In this thesis I recorded brain activity while people typed and spoke, to see how the brain does this. " +
      "It turns out the brain holds the sentence, the words, the syllables and the individual sounds all at once, " +
      "and keeps the upcoming pieces in order by constantly changing how each one is encoded. " +
      "I then combined these insights with AI models trained on large amounts of brain data to decode typed sentences " +
      "from non-invasive brain recordings, and to improve speech decoding from electrodes inside the brain. " +
      "The long-term goal: brain–computer interfaces that give people who have lost the ability to speak, for example through ALS, their voice back.",
    pdfUrl: "", // optional link to the thesis PDF / repository record
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
    start: "2026-12-17T14:00", // TODO check the start time  (YYYY-MM-DDTHH:MM, Paris time)
    end: "2026-12-17T16:30", // TODO check the end time
    room: "Lecture Theatre 1.23", // TODO
    building: "Main Building", // TODO
    address: "1 University Road, City, Postcode", // TODO  (used for the map)
    mapQuery: "", // optional: override what's searched on the map, e.g. "Main Building, University of X"
    // (HTML ok) Shown in "Getting there"
    directions: {
      entrance:
        "Use the main entrance and check in at the security desk — they'll have the guest list. Please bring photo ID.",
      transit: "TODO: e.g. Bus 12 or 15 to University Square, then a 3-minute walk.",
      parking: "TODO: e.g. Paid visitor parking at Car Park B (entrance on X Street).",
      accessibility: "TODO: e.g. Step-free access via the side entrance; lift to the 1st floor.",
    },
    online: {
      show: true,
      // Tip: leave url empty and send the link in the Google Form confirmation message instead,
      // so it isn't public (avoids uninvited "zoombombers").
      url: "",
      note: "The livestream link will be shown after you register.",
    },
  },

  celebration: {
    show: true,
    title: "Post-defence celebration",
    start: "2026-12-17T18:00", // TODO
    end: "2026-12-17T22:00", // TODO
    venue: "The Name of the Pub / Café", // TODO
    address: "12 Example Street, City", // TODO  (leave "" to keep it private — share it in the form confirmation instead)
    // (HTML ok)
    details:
      "Drinks and snacks — come for one or stay all evening. Partners, friends and family are all very welcome. " +
      "TODO: mention if there's food, a tab, or if people should bring anything.",
  },

  rsvp: {
    // Paste the LONG Google Form link (Send → link icon → untick "Shorten URL").
    // It looks like https://docs.google.com/forms/d/e/XXXXXXXX/viewform
    googleFormUrl: "", // TODO
    deadline: "2026-12-10", // TODO  last day to register (YYYY-MM-DD) — check with security how much notice they need
    formHeight: 1500, // pixels; increase if the embedded form shows its own scrollbar
  },

  // Rough plan of the day. Times are plain text, shown as written.
  schedule: [
    { time: "13:45", title: "Doors open", text: "Check in at the security desk with photo ID and find a seat." },
    { time: "14:00", title: "Public presentation", text: "A ~30-minute overview of the research, aimed at a general audience." },
    { time: "14:30", title: "Questions from the committee", text: "The examiners question the candidate. The audience listens." },
    { time: "≈16:00", title: "Committee deliberates", text: "The committee leaves to decide; everyone waits outside." },
    { time: "≈16:30", title: "Verdict & congratulations", text: "The result is announced — then photos, hugs and flowers." },
    { time: "18:00", title: "Celebration", text: "Drinks at the celebration venue (see below)." },
  ],

  // (HTML ok in answers)
  faq: [
    {
      q: "Do I need to understand the research to come?",
      a: "Not at all! The presentation is aimed at a general audience, and most of the fun is the atmosphere.",
    },
    {
      q: "Why do I need to register?",
      a: "The building has controlled access, so security needs the full name of everyone attending in person. If you're not on the list you may not get in — please register by the deadline and bring photo ID.",
    },
    {
      q: "Can I bring someone?",
      a: "Yes, very welcome! Please ask them to fill in the form themselves, so their name is on the security list too.",
    },
    {
      q: "What should I wear?",
      a: "Whatever you're comfortable in — smart casual is perfect.",
    },
    {
      q: "Can I arrive late or leave early?",
      a: "Please try to be seated by 14:00. If you're late, wait for a pause and enter quietly at the back.",
    },
    {
      q: "Can I take photos?",
      a: "Yes, but please without flash, and save most of them for after the verdict!",
    },
    {
      q: "I can't make it — can I still watch?",
      a: "Yes, there will be a livestream. Register and choose \"Online\" and you'll get the link.",
    },
  ],

  contact: {
    email: "", // TODO  shown in the footer as "Questions? Email me"
    note: "Questions, or trouble with the form? Get in touch.",
  },

  // Shown automatically once the defence has finished.
  afterDefence: {
    headline: "It's official — the defence is done! 🎉",
    message: "Thank you so much to everyone who came, watched and supported along the way.",
  },
};
