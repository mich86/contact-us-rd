// Validates name contains only letters, hyphens, apostrophes and spaces
export function validateName(value: string): string | null {
  if (!value.trim()) return "Please enter your name.";
  if (!/^[a-zA-Z\s\-']+$/.test(value))
    return "Please enter a valid name (letters, hyphens and apostrophes only).";
  return null;
}

// Validates email format
export function validateEmail(value: string): string | null {
  if (!value.trim()) return "Please enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email address.";
  return null;
}

// Optional field — only validates if a value is provided
export function validateDate(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (isNaN(date.getTime())) return "Please enter a valid date of birth.";
  if (date > new Date()) return "Date of birth cannot be in the future.";
  return null;
}

// Optional field — validates UK phone format if provided
export function validatePhone(value: string): string | null {
  if (!value.trim()) return null;
  if (!/^(\+44|0)[0-9]{9,10}$/.test(value.replace(/\s/g, "")))
    return "Please enter a valid UK phone number.";
  return null;
}
