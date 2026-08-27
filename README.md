# RD - Contact Form

A contact form built as part of the RD frontend technical test.

## Live URL

https://contact-us-rd.pages.dev/

## Tech Stack

- [Astro](https://astro.build/) v7.2.7 - static site framework
- TypeScript - form validation and submission logic
- Sass v1.103.1 - styling with BEM methodology and atomic design architecture
- Vitest v4.1.11 - unit testing
- Prettier v3.9.6 - code formatting
- Cloudflare Pages - deployment

## Prerequisites

- Node.js v24.18.0
- npm v11.16.0

### Install

```bash
cd app
npm install
```

### Run locally

```bash
npm run dev
```

The dev server will start at `http://localhost:4321`.

### Run tests

```bash
npm test
```

## Git Workflow

In a production environment, a branching strategy would be used - feature branches for development, with pull requests into a `main` branch for deployment. For the purposes of this test, commits were made directly to `main`.

## Assumptions and Decisions

### Form fields

- **Name and email are required** - date of birth and phone are optional
- **Name validation** - letters, hyphens, apostrophes and spaces only. Spaces are permitted to support double-barrelled names (e.g. John Smith)
- **Phone validation** - UK format only (07... or +44...). Noted as an assumption as the brief did not specify
- **Date of birth** - optional field. In a production context I would question whether this data is necessary from a GDPR perspective - personal data should only be collected if there is a clear reason to do so
- **Company name** - not included. The brief specified four fields only; adding additional fields would be scope creep. Noted as a consideration
- **Textarea** - not included for the same reason. Would be a natural addition in a real contact form
- **Consent checkboxes and reCAPTCHA** - out of scope for this test

### Validation

- Written using vanilla TypeScript as per the brief - no validation libraries used
- Errors display on submit, then update in real time after the first submission attempt
- The browser's built-in validation is disabled via `novalidate` and replaced with custom logic
- XSS sanitisation is applied to all user input before rendering in the submissions list

### Styling

- No branding file was provided - colours, fonts and spacing were taken from the live RD website using browser devtools
- Poppins font downloaded from Google Fonts as TTF. In a production environment woff2 would be preferred for better compression and performance
- Sass used with BEM naming convention
- Atomic design principles applied to the SCSS architecture (atoms, molecules, organisms) to demonstrate scalable and maintainable CSS organisation. In a component-based framework such as React this structure would extend to the component files themselves
- Mobile-first approach using `min-width` media queries, scaling up from 375px

### Submissions

- Submissions are stored in memory (JavaScript array) and are lost on page refresh. This is expected client-side behaviour for a static site with no backend. localStorage could be used to persist submissions across sessions as a future enhancement
- Submissions are rendered as an ordered list (`<ol>`) to reflect the chronological order of entries

### Deployment

- Deployed to Cloudflare Pages rather than Cloudflare Workers directly. Pages is better suited for static sites and requires less configuration. The Cloudflare adapter for Astro is included in the project

### Browser support

- Tested against the [GOV.UK browser support list](https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices)

## Known Browser Differences

- **Safari** — the date of birth field initially used `type="date"` which displayed today's date as a default value and overflowed its container on iOS Safari. This was resolved by replacing the native date input with three separate text inputs for day, month and year, following the GOV.UK design system pattern. This also improves accessibility and cross-browser consistency.

## Accessibility

- WCAG 2.2 AA compliance considered throughout
- `aria-live="polite"` on the submissions section so screen readers announce new entries
- `aria-describedby` on each input pointing to its error message
- `aria-invalid` set on inputs when validation fails
- Focus moved to the first errored field on submit
- Phone number is not required - users relying on assisted technology may not have access to a phone
- Legend is visually hidden but remains in the DOM for screen readers
- Lighthouse scores: Performance 100, Accessibility 100, Best Practices 100, SEO 82
- SEO score reflects the absence of a meta description and sitemap
- axe DevTools scan returned no accessibility violations

## Future Enhancements

- Confirmation dialog before removing a submission
- Success message displayed after a valid form submission
- Loading/disabled state on the submit button while processing
- localStorage to persist submissions across page refresh
- Header and footer - out of scope for this test but would be included in a production implementation
- Confirm email field to prevent typos
- woff2 font format for production
- 404 page

## Project Structure

The `documents` folder contains:

- **Front-end Developer Technical Test** - the original brief provided by RD
- **Second Interview Brief** — the interview preparation document
- **links.md** — reference links used during development
- **braindump.md** — a running log of thoughts, questions and decisions made throughout the build process. Included to demonstrate thinking and approach rather than just the finished output
