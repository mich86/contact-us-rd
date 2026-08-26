import {
  validateName,
  validateEmail,
  validateDate,
  validatePhone,
} from "./validators";

// Types
type Submission = {
  name: string;
  email: string;
  birthdate: string;
  phone: string;
};

// DOM elements
const form = document.querySelector<HTMLFormElement>(".contact-form");
const nameInput = document.querySelector<HTMLInputElement>("#name");
const emailInput = document.querySelector<HTMLInputElement>("#email");
const birthdateInput = document.querySelector<HTMLInputElement>("#birthdate");
const phoneInput = document.querySelector<HTMLInputElement>("#phone");

// Error/field helpers
function showError(input: HTMLInputElement, message: string): void {
  const field = input.closest(".contact-form__field");
  const error = document.getElementById(`${input.id}-error`);
  if (!field || !error) return;
  error.textContent = message;
  error.removeAttribute("hidden");
  input.setAttribute("aria-invalid", "true");
  field.classList.add("contact-form__field--error");
}

function clearError(input: HTMLInputElement): void {
  const field = input.closest(".contact-form__field");
  const error = document.getElementById(`${input.id}-error`);
  if (!field || !error) return;
  error.setAttribute("hidden", "");
  input.removeAttribute("aria-invalid");
  field.classList.remove("contact-form__field--error");
}

// Sanitise user input to prevent XSS
function sanitise(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

// Format date from yyyy-mm-dd to dd/mm/yyyy
function formatDate(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

// Submissions state
const submissions: Submission[] = [];

// Track whether form has been submitted once
let hasSubmitted = false;

// Render submissions
function renderSubmissions(): void {
  const section = document.querySelector<HTMLElement>("section[aria-live]");
  if (!section) return;

  section.innerHTML = "<h2>Submissions</h2>";

  if (submissions.length === 0) return;

  const list = document.createElement("ol");
  list.classList.add("submissions__list");

  submissions.forEach((submission, index) => {
    const entry = document.createElement("li");
    entry.classList.add("submission__entry");
    entry.innerHTML = `
      <div class="submission__data">
        <p><strong>Name:</strong> ${sanitise(submission.name)}</p>
        <p><strong>Email:</strong> ${sanitise(submission.email)}</p>
        ${submission.birthdate ? `<p><strong>Date of birth:</strong> ${formatDate(submission.birthdate)}</p>` : ""}
        ${submission.phone ? `<p><strong>Phone:</strong> ${sanitise(submission.phone)}</p>` : ""}
      </div>
      <button type="button" class="btn btn--outline" aria-label="Remove entry for ${sanitise(submission.name)}">Remove</button>
    `;

    entry
      .querySelector(".submission__remove")
      ?.addEventListener("click", () => {
        submissions.splice(index, 1);
        renderSubmissions();
      });

    list.appendChild(entry);
  });

  section.appendChild(list);
}

// Real-time validation listeners (only active after first submit)
nameInput?.addEventListener("input", () => {
  if (!hasSubmitted) return;
  const error = validateName(nameInput.value);
  error ? showError(nameInput, error) : clearError(nameInput);
});

emailInput?.addEventListener("input", () => {
  if (!hasSubmitted) return;
  const error = validateEmail(emailInput.value);
  error ? showError(emailInput, error) : clearError(emailInput);
});

birthdateInput?.addEventListener("input", () => {
  if (!hasSubmitted) return;
  const error = validateDate(birthdateInput.value);
  error ? showError(birthdateInput, error) : clearError(birthdateInput);
});

phoneInput?.addEventListener("input", () => {
  if (!hasSubmitted) return;
  const error = validatePhone(phoneInput.value);
  error ? showError(phoneInput, error) : clearError(phoneInput);
});

// Form submit handler
form?.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  hasSubmitted = true;

  if (!nameInput || !emailInput || !birthdateInput || !phoneInput) return;

  const nameError = validateName(nameInput.value);
  const emailError = validateEmail(emailInput.value);
  const dateError = validateDate(birthdateInput.value);
  const phoneError = validatePhone(phoneInput.value);

  nameError ? showError(nameInput, nameError) : clearError(nameInput);
  emailError ? showError(emailInput, emailError) : clearError(emailInput);
  dateError ? showError(birthdateInput, dateError) : clearError(birthdateInput);
  phoneError ? showError(phoneInput, phoneError) : clearError(phoneInput);

  // Focus first errored field
  const firstError = [nameInput, emailInput, birthdateInput, phoneInput].find(
    (input) => input.getAttribute("aria-invalid") === "true",
  );
  if (firstError) {
    firstError.focus();
    return;
  }

  // Add submission
  submissions.push({
    name: nameInput.value,
    email: emailInput.value,
    birthdate: birthdateInput.value,
    phone: phoneInput.value,
  });

  renderSubmissions();
  form.reset();
});
