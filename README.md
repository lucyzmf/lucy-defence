# PhD defence website

A simple one-page site for the defence: date and time with a countdown, add-to-calendar links, the celebration details, the schedule, a registration form (for the security guest list), directions, the thesis summary and an FAQ. It works on phones and laptops.

**You only need to edit `config.js`.** Every TODO in that file is placeholder text.

| File | What it is |
|---|---|
| `config.js` | All the content: dates, rooms, form link, schedule, FAQ. **Edit this.** |
| `index.html` | Page shell. Only edit the link-preview `<meta>` tags at the top. |
| `app.js` | Builds the page from the config. No need to touch it. |
| `styles.css` | Look and feel. Colours are at the top if you want to change them. |

---

## 1. Preview it on your laptop

```bash
cd "/Users/lucy/Documents/PhD stuff/research/lucy-defense-website"
python3 -m http.server 8000
```
Then open http://localhost:8000. Refresh after each edit to `config.js`.
(Opening `index.html` by double-clicking mostly works too, but the map and form embeds behave better through the local server.)

To check the phone layout, open Chrome DevTools (⌥⌘I) and click the phone icon.

---

## 2. Make the Google Form (the security list)

Go to https://forms.google.com and create a blank form. Suggested questions:

| # | Question | Type | Required |
|---|---|---|---|
| 1 | **Full name (exactly as on your photo ID)** | Short answer | ✅ |
| 2 | Email | Short answer (Response validation → Text → Email) | ✅ |
| 3 | How will you join the defence? (*In person* / *Online* / *Can't make it*) | Multiple choice | ✅ |
| 4 | Are you coming to the celebration? (*Yes* / *No* / *Maybe*) | Multiple choice | ✅ |
| 5 | How do you know me? (*Family* / *Friend* / *Colleague* / *Other*) | Multiple choice | |
| 6 | Dietary requirements or allergies | Short answer | |
| 7 | Accessibility needs | Short answer | |
| 8 | A message for me (optional) 💌 | Paragraph | |

**Before adding anything else, ask building security exactly what they need.** Some want only the name, some want an affiliation, and some need a date of birth or ID number. Don't collect more personal data than security actually asks for.

**Settings to check:**
- ⚙️ Settings → Responses → **Limit to 1 response: OFF**. Leaving it on forces people to sign in with Google, which shuts out anyone without an account.
- Settings → Presentation → **Confirmation message**: this message is only shown to people who submit, so it's the right place for private details:
  > Thanks, you're on the list! 🎓 Please bring photo ID.
  > Livestream: https://zoom.us/j/... (passcode ...)
  > Celebration address: ...
- Settings → Presentation → "View results summary" should stay **OFF**, so guests can't see each other's details.

**Link it to the site:**
1. Click **Send** → the 🔗 link tab → **untick "Shorten URL"** → Copy.
   It should look like `https://docs.google.com/forms/d/e/1FAIpQL.../viewform`. (`forms.gle/...` short links can't be embedded.)
2. Paste it into `rsvp.googleFormUrl` in `config.js`.

### Making the list for security
In the form, go to **Responses** → **Link to Sheets**. You get a spreadsheet that fills itself in as people register. When the deadline passes:
1. In the sheet: **Data → Create a filter** and filter the *"How will you join"* column to **In person**.
2. Copy the name column (plus any other columns security asked for) into a new sheet, sort A→Z, and send it as PDF or Excel (**File → Download**).
3. Remember the people who'll be there *without* filling in the form: you, your supervisors, the committee, and partners or family you invited directly. Check with security whether they need those names too.
4. Late registrations do happen. Ask security whether they accept a short update list on the day before.

The same sheet doubles as your **headcount for the celebration** (filter column 4) and your **dietary list**.

---

## 3. Put it online with GitHub Pages (free)

**Easiest way, no command line:**
1. Create a free account at https://github.com if you don't have one.
2. Click **+ → New repository**. Name it e.g. `phd-defence`, set it to **Public**, and tick "Add a README" so the repo isn't empty.
3. In the repo: **Add file → Upload files** → drag in `index.html`, `app.js`, `config.js`, `styles.css`, `.nojekyll`, and the `assets/` folder if you added a photo → **Commit changes**.
4. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → **Save**.
5. Wait about a minute. The site will be at **`https://YOUR-USERNAME.github.io/phd-defence/`**.

To make changes later, edit `config.js` directly on GitHub (open the file → ✏️ pencil icon → Commit). The site updates within a minute or two.

**With git, if you prefer:**
```bash
git init && git add . && git commit -m "Defence website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/phd-defence.git
git push -u origin main
```
Then do step 4 above.

> 💡 If you name the repo `YOUR-USERNAME.github.io`, the site lives at `https://YOUR-USERNAME.github.io/` with no `/phd-defence/` on the end.

---

## 4. Finishing touches

- **Link previews:** edit the `og:title` / `og:description` tags at the top of `index.html`. They control what shows up when the link is pasted into WhatsApp, Slack or iMessage. For a preview image, add a 1200×630 picture in `assets/` and uncomment the `og:image` line, using the **full** URL.
- **QR code for posters or the department screen:** paste the site URL into any free QR generator, or in Chrome use ⋮ → Cast, save and share → Create QR code.
- **After the defence**, the countdown changes by itself to "Happening right now" during the defence and then to the `afterDefence` message. Nothing to do on the day.
- Times are shown in the venue's time zone. Visitors in a different zone also see "That's 15:00 CET where you are."

## ⚠️ Privacy note
GitHub Pages sites are **public**: anyone with the link can see everything in `config.js`. Keep private things out of it, such as a home address for the party, the Zoom link or phone numbers. Put them in the form's confirmation message instead. The form responses themselves stay private in your Google account.

## Checklist
- [ ] Ask security what details they need and by when
- [ ] Fill in every TODO in `config.js`
- [ ] Create the Google Form, link it to a Sheet, set the confirmation message
- [ ] Paste the form link into `config.js`
- [ ] Book the celebration venue and confirm whether it can take a group (and whether you need a deposit)
- [ ] Set up the livestream (Zoom/Teams) and put the link in the form confirmation
- [ ] Publish on GitHub Pages and test the link on your phone
- [ ] Send the link out (department mailing list, family group chat…)
- [ ] After the deadline: send the filtered list to security
- [ ] Day before: email registered guests a reminder (copy the emails from the Sheet)
