import { describe, it, expect } from "vitest";
import {
  validateName,
  validateEmail,
  validateDate,
  validatePhone,
} from "../scripts/validators";

describe("validateName", () => {
  it("returns an error for an empty string", () => {
    expect(validateName("")).toBe("Please enter your name.");
  });

  it("returns an error for a string with only spaces", () => {
    expect(validateName("   ")).toBe("Please enter your name.");
  });

  it("returns an error for a name with numbers", () => {
    expect(validateName("John123")).toBe(
      "Please enter a valid name (letters, hyphens and apostrophes only).",
    );
  });

  it("returns null for a valid full name", () => {
    expect(validateName("John Smith")).toBeNull();
  });

  it("returns null for a name with a hyphen", () => {
    expect(validateName("Mary-Jane")).toBeNull();
  });

  it("returns null for a name with an apostrophe", () => {
    expect(validateName("O'Brien")).toBeNull();
  });
});

describe("validateEmail", () => {
  it("returns an error for an empty string", () => {
    expect(validateEmail("")).toBe("Please enter your email address.");
  });

  it("returns an error for a string with only spaces", () => {
    expect(validateEmail("   ")).toBe("Please enter your email address.");
  });

  it("returns an error for an email missing the @ symbol", () => {
    expect(validateEmail("johndoe.com")).toBe(
      "Please enter a valid email address.",
    );
  });

  it("returns an error for an email missing the domain", () => {
    expect(validateEmail("john@")).toBe("Please enter a valid email address.");
  });

  it("returns null for a valid email address", () => {
    expect(validateEmail("john@example.com")).toBeNull();
  });

  it("returns null for a valid email with subdomain", () => {
    expect(validateEmail("john@mail.example.com")).toBeNull();
  });
});

describe("validateDate", () => {
  it("returns null for an empty string (optional field)", () => {
    expect(validateDate("")).toBeNull();
  });

  it("returns an error for a future date", () => {
    expect(validateDate("2099-01-01")).toBe(
      "Date of birth cannot be in the future.",
    );
  });

  it("returns an error for an invalid date string", () => {
    expect(validateDate("not-a-date")).toBe(
      "Please enter a valid date of birth.",
    );
  });

  it("returns null for a valid past date", () => {
    expect(validateDate("1990-06-15")).toBeNull();
  });
});

describe("validatePhone", () => {
  it("returns null for an empty string (optional field)", () => {
    expect(validatePhone("")).toBeNull();
  });

  it("returns null for a valid UK mobile number", () => {
    expect(validatePhone("07700900000")).toBeNull();
  });

  it("returns null for a valid UK mobile number with spaces", () => {
    expect(validatePhone("07700 900000")).toBeNull();
  });

  it("returns null for a valid UK number with +44 prefix", () => {
    expect(validatePhone("+447700900000")).toBeNull();
  });

  it("returns an error for a number that is too short", () => {
    expect(validatePhone("0770090")).toBe(
      "Please enter a valid UK phone number.",
    );
  });

  it("returns an error for a number not starting with 0 or +44", () => {
    expect(validatePhone("17700900000")).toBe(
      "Please enter a valid UK phone number.",
    );
  });

  it("returns an error for a number containing letters", () => {
    expect(validatePhone("0770090000a")).toBe(
      "Please enter a valid UK phone number.",
    );
  });
});
