# Wee place to put my thoughts & ways of working

## Techs

- node -v 24.18.0
- npm -v 11.16.0
- astro -v 5.2.4
- astro vsc extension
- prettier plugin to allow .prettierrc

## Form

- which fields are required?
- regex patterns
- name - should this be labelled fullname to be professional? depends on the vibe
- name - letters, hyphens, apostrophes, spaces only?
- name - spaces ok for double barrlled names
- name - should company name be an option or stated?
- this is for Reason Digital (an agency) should there be a field for company name?
- phone - isn't required for hard of hearing/ assisted technology users
- phone - UK only or international? Regex
- dob - contraints: min age? why do we need it? GDPR
- what should the helper text be for validation errors
- should there be a textarea for the user to write why they are contacting? yes, how many characters?
- errors - show on submit only? or when the field loses focus?
- consent checkboxes required?
- reCATCHA required?

### Date of birth field

- replaced native date input with day/month/year text inputs
- native date input had inconsistent behaviour across browsers (Safari default value, iOS width issues)
- GOV.UK design system uses this same pattern
- padStart used to handle single digit day/month input e.g. 1 becomes 01

## Styling

- no branding file provided, using the live site
- fonts - google fonts download, TTF only prefer woff2
- fonts - kept bold, regular and semibold only
- atomic design architecture
- sass with BEM

## Submissions

- have a warning/confirm after clicking remove, UX?
- submissions lost on refresh
- XSS sanitation applied

## Accessibility

- phone - not required for hard of hearing/assisted tech users
- legend - semantic but hidden visually
- aria-live="polite" on submissions
- aria-describedby on inputs pointing for error spans
- aria-invalid set on inputs when validation fails
- focus moved to first errored field on submit

## Considerations

- 404 page
- cookies
- update favicons
- SEO scanning
- local storage for submissions refresh
- header and footer, out of scope
- disabled state on submit button while processing
