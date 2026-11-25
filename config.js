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
    start: "2026-12-17T16:00", // YYYY-MM-DDTHH:MM, Paris time
    end: "2026-12-17T18:00",
    room: "Salle des Actes",
    building: "École normale supérieure (ENS-PSL)",
    address: "45 rue d'Ulm, 75005 Paris",
    mapQuery: "École normale supérieure, 45 rue d'Ulm, 75005 Paris",
    // Your Google Calendar invite link — used for the "Add to calendar: Google" link
    calendarUrl: "https://calendar.app.google/dwv2MtcWn7kL8Fh19",
    // (HTML ok) Shown in "Getting there"
    directions: {
      entrance:
        "Come to the main entrance at 45 rue d'Ulm and give your name at the reception desk — they'll have the guest list. Please bring photo ID.",
      transit: "RER B: Luxembourg (about 8 minutes' walk). Metro line 7: Place Monge (about 10 minutes' walk).",
      parking: "There's no visitor parking at the ENS — public transport is easiest.",
      accessibility: "", // TODO add step-free access info if you know it (leave "" to hide this row)
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
    start: "2026-12-17T18:30", // TODO set when the venue is booked
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
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSd8Kni-pc8vPkOO5w2pzPtVc2wGYUKRdERdgI-R0JPuBHs-Kg/viewform",
    deadline: "2026-12-10", // TODO  last day to register (YYYY-MM-DD) — check with security how much notice they need
    formHeight: 1100, // pixels; increase if the embedded form shows its own scrollbar
  },

  // Rough plan of the day. Times are plain text, shown as written.
  schedule: [
    { time: "15:45", title: "Doors open", text: "Check in at the reception desk with photo ID and find a seat in the Salle des Actes." },
    { time: "16:00", title: "Public presentation", text: "An overview of the research, aimed at a general audience." },
    { time: "≈16:45", title: "Questions from the jury", text: "The jury questions the candidate. The audience listens." },
    { time: "≈17:40", title: "Jury deliberates", text: "The jury leaves to decide; everyone waits outside." },
    { time: "≈18:00", title: "Verdict & congratulations", text: "The result is announced — then photos, hugs and flowers." },
    { time: "18:30", title: "Celebration", text: "Drinks at the celebration venue (see below)." },
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
      a: "Please try to be seated by 16:00. If you're late, wait for a pause and enter quietly at the back.",
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
