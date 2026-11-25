/* Builds the page from config.js. You shouldn't need to edit this file. */
(function () {
  "use strict";

  const C = window.DEFENCE;
  const app = document.getElementById("app");
  if (!C) {
    app.innerHTML = "<p>config.js failed to load. Check it for a typo (a missing comma or quote).</p>";
    return;
  }

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tz = C.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = C.locale || undefined;
  const viewerTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const pageUrl = location.href.split("#")[0];

  // Offset (ms) between a time zone's clock and UTC at a given moment.
  function tzOffsetMs(date, zone) {
    const d = new Date(Math.floor(date.getTime() / 1000) * 1000);
    const p = {};
    new Intl.DateTimeFormat("en-US", {
      timeZone: zone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(d).forEach((x) => (p[x.type] = x.value));
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second) - d.getTime();
  }
  // "2027-01-20T14:00" in the venue's time zone → Date
  function zoned(str) {
    const [date, time = "00:00"] = String(str).split("T");
    const [y, m, d] = date.split("-").map(Number);
    const [h, mi, s = 0] = time.split(":").map(Number);
    const guess = Date.UTC(y, m - 1, d, h, mi, s);
    const off1 = tzOffsetMs(new Date(guess), tz);
    let utc = guess - off1;
    const off2 = tzOffsetMs(new Date(utc), tz);
    if (off2 !== off1) utc = guess - off2;
    return new Date(utc);
  }
  const fmt = (d, opts, zone = tz) => new Intl.DateTimeFormat(locale, { timeZone: zone, ...opts }).format(d);
  const fmtDate = (d) => fmt(d, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const fmtTime = (d) => fmt(d, { hour: "numeric", minute: "2-digit" });
  const tzAbbr = (d) =>
    (new Intl.DateTimeFormat(locale, { timeZone: tz, timeZoneName: "short" }).formatToParts(d).find((p) => p.type === "timeZoneName") || {}).value || "";
  function localHint(d) {
    if (!viewerTz || viewerTz === tz || tzOffsetMs(d, viewerTz) === tzOffsetMs(d, tz)) return "";
    return `(${fmt(d, { weekday: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short" }, viewerTz)} your time)`;
  }

  /* ---------- events ---------- */
  const P = C.person || {}, T = C.thesis || {}, D = C.defence || {}, CEL = C.celebration || {}, R = C.rsvp || {};
  const dStart = zoned(D.start);
  const dEnd = D.end ? zoned(D.end) : new Date(dStart.getTime() + 2 * 3600e3);
  const place = [D.room, D.building].filter(Boolean).join(", ");
  const events = {
    defence: {
      key: "defence",
      googleUrl: D.calendarUrl || "",
      title: `PhD defence – ${P.name}`,
      start: dStart, end: dEnd,
      location: [D.room, D.building, D.address].filter(Boolean).join(", "),
      description: `${T.title ? `"${T.title}"\n\n` : ""}Please register and bring photo ID.\nDetails: ${pageUrl}`,
    },
  };
  const hasCel = CEL.show !== false && CEL.start;
  if (hasCel) {
    const cStart = zoned(CEL.start);
    events.celebration = {
      key: "celebration",
      title: `${CEL.title || "Celebration"} – ${P.name}`,
      start: cStart, end: CEL.end ? zoned(CEL.end) : new Date(cStart.getTime() + 3 * 3600e3),
      location: [CEL.venue, CEL.address].filter(Boolean).join(", "),
      description: `Celebrating ${P.name}'s PhD defence!\nDetails: ${pageUrl}`,
    };
  }
  const deadline = R.deadline ? zoned(R.deadline + "T23:59") : null;
  const deadlineText = deadline ? fmt(deadline, { weekday: "long", day: "numeric", month: "long" }) : "";

  /* ---------- calendar ---------- */
  const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const gcalUrl = (ev) =>
    "https://calendar.google.com/calendar/render?" +
    new URLSearchParams({ action: "TEMPLATE", text: ev.title, dates: `${stamp(ev.start)}/${stamp(ev.end)}`, details: ev.description, location: ev.location });
  function icsText(ev) {
    const e = (s) => String(s).replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
    const fold = (line) => (line.match(/.{1,73}/g) || [""]).join("\r\n ");
    return [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//phd-defence-site//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VEVENT", `UID:${ev.key}-${stamp(ev.start)}@phd-defence`, `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(ev.start)}`, `DTEND:${stamp(ev.end)}`, `SUMMARY:${e(ev.title)}`, `LOCATION:${e(ev.location)}`,
      `DESCRIPTION:${e(ev.description)}`, `URL:${pageUrl}`,
      "BEGIN:VALARM", "TRIGGER:-PT1H", "ACTION:DISPLAY", `DESCRIPTION:${e(ev.title)}`, "END:VALARM",
      "END:VEVENT", "END:VCALENDAR",
    ].map(fold).join("\r\n");
  }
  function downloadIcs(key) {
    const ev = events[key];
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([icsText(ev)], { type: "text/calendar;charset=utf-8" }));
    a.download = `phd-${key}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  const calLinks = (ev) =>
    `<p class="cal">Add to calendar:
      <a href="${esc(ev.googleUrl || gcalUrl(ev))}" target="_blank" rel="noopener">Google</a> ·
      <a href="#" data-ics="${ev.key}">Apple / Outlook</a></p>`;
  const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const row = (label, value) => (value ? `<tr><th>${label}</th><td>${value}</td></tr>` : "");

  /* ---------- page ---------- */
  const hint = localHint(dStart);
  const defenceMap = D.mapQuery || D.address;

  const header = `
    <header>
      <p class="kicker">${esc(P.degree || "PhD")} Thesis Defence</p>
      <h1>${esc(P.name)}</h1>
      ${T.title ? `<p class="title">${esc(T.title)}</p>` : ""}
      <p id="countdown" class="countdown"></p>
    </header>`;

  const defence = `
    <section id="defence">
      <h2>The defence</h2>
      <table class="info">
        ${row("Date", fmtDate(dStart))}
        ${row("Time", `${fmtTime(dStart)} – ${fmtTime(dEnd)} ${esc(tzAbbr(dStart))}${hint ? ` <span class="muted">${esc(hint)}</span>` : ""}`)}
        ${row("Room", esc(place))}
        ${row("Address", D.address ? `${esc(D.address)}${defenceMap ? ` · <a href="${esc(mapsLink(defenceMap))}" target="_blank" rel="noopener">Map</a>` : ""}` : "")}
        ${D.online && D.online.show !== false
          ? row("Online", D.online.url ? `<a href="${esc(D.online.url)}" target="_blank" rel="noopener">Livestream link</a>` : esc(D.online.note || ""))
          : ""}
      </table>
      ${D.findRoom || D.mapImage ? `
        <h3>Finding the room</h3>
        ${D.findRoom ? `<p>${D.findRoom}</p>` : ""}
        ${D.mapImage ? `<a href="${esc(D.mapImage)}" target="_blank" rel="noopener"><img class="map-img" src="${esc(D.mapImage)}" alt="Map of 45 rue d'Ulm with the Salle des Actes (no. 15, next to staircase A) circled in red" loading="lazy"></a>
          <p class="small muted">Salle des Actes circled in red (no. 15). Tap the map to enlarge.</p>` : ""}` : ""}
      ${calLinks(events.defence)}
      <p><a class="button" href="#register">Register to attend</a></p>
    </section>`;

  const celebration = hasCel ? `
    <section id="celebration">
      <h2>${esc(CEL.title || "Celebration")}</h2>
      <table class="info">
        ${row("Date", fmtDate(events.celebration.start))}
        ${row("Time", CEL.end ? `${fmtTime(events.celebration.start)} – ${fmtTime(events.celebration.end)}` : `From ${fmtTime(events.celebration.start)}`)}
        ${row("Where", esc(CEL.venue || ""))}
        ${row("Address", CEL.address ? `${esc(CEL.address)} · <a href="${esc(mapsLink([CEL.venue, CEL.address].filter(Boolean).join(", ")))}" target="_blank" rel="noopener">Map</a>` : "")}
      </table>
      ${CEL.details ? `<p>${CEL.details}</p>` : ""}
      ${calLinks(events.celebration)}
    </section>` : "";

  const schedule = (C.schedule || []).length ? `
    <section id="schedule">
      <h2>Schedule</h2>
      <table class="schedule">
        ${C.schedule.map((s) => `<tr><th>${esc(s.time)}</th><td><strong>${esc(s.title)}</strong>${s.text ? `<br><span class="muted">${s.text}</span>` : ""}</td></tr>`).join("")}
      </table>
      <p class="muted small">Times after the presentation are approximate.</p>
    </section>` : "";

  let embedUrl = "";
  if (R.googleFormUrl) {
    try {
      const u = new URL(R.googleFormUrl);
      if (/docs\.google\.com$/.test(u.hostname)) { u.searchParams.set("embedded", "true"); embedUrl = u.toString(); }
    } catch (_) {}
  }
  const register = `
    <section id="register">
      <h2>Register</h2>
      <div class="notice">
        <p><strong>Everyone attending in person needs to register${deadlineText ? ` by ${deadlineText}` : ""}.</strong>
        Security will check names against a guest list at the entrance.</p>
        <ul>
          <li>Use your name exactly as it appears on your photo ID, and bring the ID.</li>
          <li>If you're bringing someone, they need to fill in the form too.</li>
          <li>Joining online or only coming to the celebration? Please register anyway.</li>
        </ul>
      </div>
      ${embedUrl
        ? `<iframe class="form" src="${esc(embedUrl)}" title="Registration form" loading="lazy" height="${Number(R.formHeight) || 1500}">Loading…</iframe>
           <p class="small muted">Form not loading? <a href="${esc(R.googleFormUrl)}" target="_blank" rel="noopener">Open it in a new tab</a>.</p>`
        : R.googleFormUrl
        ? `<p><a class="button" href="${esc(R.googleFormUrl)}" target="_blank" rel="noopener">Open the registration form</a></p>`
        : `<p class="muted"><em>Registration form coming soon.</em></p>`}
    </section>`;

  const dirs = D.directions || {};
  const dirItems = [["Arriving", dirs.entrance], ["Public transport", dirs.transit], ["Parking", dirs.parking], ["Accessibility", dirs.accessibility]].filter(([, v]) => v);
  const directions = dirItems.length ? `
    <section id="directions">
      <h2>Getting there</h2>
      <table class="info">${dirItems.map(([h, v]) => row(h, v)).join("")}</table>
    </section>` : "";

  const list = (arr) => (arr || []).filter((x) => x && String(x).trim()).map(esc).join("<br>");
  const thesis = T.abstract || list(T.supervisors) || list(T.committee) ? `
    <section id="thesis">
      <h2>About the thesis</h2>
      ${T.abstract ? `<p>${T.abstract}</p>` : ""}
      ${T.pdfUrl ? `<p><a href="${esc(T.pdfUrl)}" target="_blank" rel="noopener">Read the thesis</a></p>` : ""}
      <table class="info">
        ${row("Supervisors", list(T.supervisors))}
        ${row("Committee", list(T.committee))}
        ${row("Department", esc([P.department, P.university].filter(Boolean).join(", ")))}
      </table>
    </section>` : "";

  const faq = (C.faq || []).length ? `
    <section id="faq">
      <h2>FAQ</h2>
      ${C.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`).join("")}
    </section>` : "";

  const contact = C.contact || {};
  const footer = contact.email
    ? `<footer><p>${esc(contact.note || "Questions?")} <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></p></footer>`
    : "";

  app.innerHTML = `<main>${header}${defence}${thesis}${celebration}${schedule}${register}${directions}${faq}${footer}</main>`;
  document.title = `${P.name} · ${P.degree || "PhD"} Defence`;

  /* ---------- countdown ---------- */
  const cd = document.getElementById("countdown");
  const after = C.afterDefence || {};
  function tick() {
    const now = Date.now();
    if (now < dStart) {
      const s = Math.floor((dStart - now) / 1000);
      const days = Math.floor(s / 86400), hours = Math.floor((s % 86400) / 3600), mins = Math.floor((s % 3600) / 60);
      cd.textContent = days > 0
        ? `${days} day${days === 1 ? "" : "s"}, ${hours} hour${hours === 1 ? "" : "s"} to go`
        : `${hours} h ${mins} min to go`;
    } else if (now < dEnd) {
      cd.innerHTML = `<strong>Happening now</strong>${D.online && D.online.url ? ` · <a href="${esc(D.online.url)}" target="_blank" rel="noopener">watch online</a>` : ""}`;
    } else {
      cd.innerHTML = `<strong>${esc(after.headline || "The defence is done!")}</strong> ${esc(after.message || "")}`;
      return;
    }
    setTimeout(tick, 30000);
  }
  tick();

  /* ---------- calendar download ---------- */
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-ics]");
    if (link) { e.preventDefault(); downloadIcs(link.dataset.ics); }
  });
})();
